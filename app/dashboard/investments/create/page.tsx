import Form from '@/app/ui/investments/create-form';
import Breadcrumbs from '@/app/ui/investments/breadcrumbs';
import { fetchCompanies } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Investment',
};

export default async function Page() {
    const companies = await fetchCompanies();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Investments', href:'/dashboard/investments' },
                    {
                        label: 'Create Investment',
                        href: '/dashboard/investments/create',
                        active: true,
                    },
                ]}
            />
            <Form companies={companies} />
        </main>
    );
}