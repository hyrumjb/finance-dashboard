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
import { 
    FlagIcon, 
    BanknotesIcon, 
    ChartPieIcon,
    ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

export default async function Page() {
    return (
        <main>
            <div className="flex items-center justify-between mb-6">
                <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
                    Financial Dashboard
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Welcome back!</span>
                    <span className="text-green-600">●</span>
                    <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400">
                    <BanknotesIcon className="h-4 w-4" />
                    Add Transaction
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-400">
                    <FlagIcon className="h-4 w-4" />
                    Set Goal
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-400">
                    <ChartPieIcon className="h-4 w-4" />
                    Portfolio Review
                </button>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>

            {/* Alerts and Notifications */}
            <div className="mt-6">
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                    <div className="flex items-start">
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                                Budget Alert
                            </h3>
                            <p className="text-sm text-yellow-700 mt-1">
                                You've spent 85% of your entertainment budget this month. Consider reducing spending in this category.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts and Recent Activity */}
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<ProfitChartSkeleton />}>
                    <ProfitChart />
                </Suspense>
                <Suspense fallback={<LatestInvestmentsSkeleton />}>
                    <LatestInvestments />
                </Suspense>
            </div>

            {/* Financial Health Score */}
            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
                <h2 className={`${lusitana.className} mb-4 text-xl`}>Financial Health Score</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">85</div>
                        <div className="text-sm text-gray-600">Overall Score</div>
                        <div className="mt-2 text-xs text-green-600">Excellent</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">92</div>
                        <div className="text-sm text-gray-600">Savings Rate</div>
                        <div className="mt-2 text-xs text-blue-600">Above Average</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">78</div>
                        <div className="text-sm text-gray-600">Investment Diversity</div>
                        <div className="mt-2 text-xs text-purple-600">Good</div>
                    </div>
                </div>
            </div>
        </main>
    );
}