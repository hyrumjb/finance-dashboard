import { Metadata } from 'next';
import { Suspense } from 'react';
import CompaniesTable from '@/app/ui/companies/table';
import { fetchFilteredCompanies } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Companies',
};

export default async function Page() {
    const companies = await fetchFilteredCompanies('');

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CompaniesTable companies={companies} />
        </Suspense>
    );
}