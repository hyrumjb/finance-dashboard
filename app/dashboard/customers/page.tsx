import { Metadata } from 'next';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Customers',
};

export default async function Page() {
    const customers = await fetchFilteredCustomers('');

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CustomersTable customers={customers} />
        </Suspense>
    );
}