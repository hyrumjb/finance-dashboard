import Pagination from '@/app/ui/investments/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/investments/table';
import { CreateInvestment } from '@/app/ui/investments/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvestmentsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvestmentsPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Investments',
};
 
export default async function Page(
    props: {
        searchParams?: Promise<{
            query?: string;
            page?: string;
        }>;
    }
) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchInvestmentsPages(query);

    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Investments</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search investments..." />
            <CreateInvestment />
        </div>
        <Suspense key={query + currentPage} fallback={<InvestmentsTableSkeleton />}>
            <Table query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div>
        </div>
    );
}