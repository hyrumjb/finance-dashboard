'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    companyId: z.string({
        invalid_type_error: 'Please select a company.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an investment status.', 
    }),
    date: z.string(),
});

const CreateInvestment = FormSchema.omit({ id: true, date: true });

const UpdateInvestment = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        companyId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvestment(prevState: State, formData: FormData) {
    const validatedFields = CreateInvestment.safeParse({
        companyId: formData.get('companyId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Investment.',
        };
    }

    const { companyId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try  {
        await sql`
        INSERT INTO investments (company_id, amount, status, date)
        VALUES (${companyId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        console.error(error);
        return {
            message: 'Database Error: Failed to Create Investment.',
        };
    }

    revalidatePath('/dashboard/investments');
    redirect('/dashboard/investments');
}

export async function updateInvestment(id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInvestment.safeParse({
        companyId: formData.get('companyId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Investment.',
        };
    }

    const { companyId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
            UPDATE investments
            SET company_id = ${companyId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error(error);
        return { message: 'Database Error. Failed to Update Investment.' };
    }

    revalidatePath('/dashboard/investments');
    redirect('/dashboard/investments');
}

export async function deleteInvestment(id: string) {
    await sql`DELETE FROM investments WHERE id = ${id}`;
    revalidatePath('/dashboard/investments');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}