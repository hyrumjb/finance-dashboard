import Form from '@/app/ui/investments/edit-form';
import Breadcrumbs from  '@/app/ui/investments/breadcrumbs';
import { fetchInvestmentById, fetchCompanies } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Investment',
};

export default async function Page(props: { params: Promise<{ id: string}> }) {
    const params = await props.params;
    const id = params.id;
    const [investment, companies] = await Promise.all([
        fetchInvestmentById(id),
        fetchCompanies(),
    ]);

    if (!investment) {
        notFound();
    }
    
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Investments', href: '/dashboard/investments' },
                    {
                        label: 'Edit Investment',
                        href: `dashboard/investments/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form investment={investment} companies={companies} />
        </main>
    );
}