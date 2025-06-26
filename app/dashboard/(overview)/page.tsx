import CardWrapper from '@/app/ui/dashboard/cards';
import ProfitChart from '@/app/ui/dashboard/profit-chart';
import LatestInvestments from '@/app/ui/dashboard/latest-investments';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { 
    LatestInvestmentsSkeleton,
    ProfitChartSkeleton,
    CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<ProfitChartSkeleton />}>
                    <ProfitChart />
                </Suspense>
                <Suspense fallback={<LatestInvestmentsSkeleton />}>
                    <LatestInvestments />
                </Suspense>
            </div>
        </main>
    );
}