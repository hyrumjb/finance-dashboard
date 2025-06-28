import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { BanknotesIcon, PlusIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Budget',
};

// Mock data - in a real app, this would come from your database
const mockBudget = [
  {
    category: 'Housing',
    budgeted: 2000,
    spent: 1850,
    remaining: 150,
    icon: '🏠',
  },
  {
    category: 'Transportation',
    budgeted: 500,
    spent: 420,
    remaining: 80,
    icon: '🚗',
  },
  {
    category: 'Food & Dining',
    budgeted: 600,
    spent: 650,
    remaining: -50,
    icon: '🍽️',
  },
  {
    category: 'Entertainment',
    budgeted: 300,
    spent: 280,
    remaining: 20,
    icon: '🎬',
  },
  {
    category: 'Healthcare',
    budgeted: 400,
    spent: 380,
    remaining: 20,
    icon: '🏥',
  },
  {
    category: 'Shopping',
    budgeted: 400,
    spent: 520,
    remaining: -120,
    icon: '🛍️',
  },
];

const totalBudgeted = mockBudget.reduce((sum, item) => sum + item.budgeted, 0);
const totalSpent = mockBudget.reduce((sum, item) => sum + item.spent, 0);
const totalRemaining = totalBudgeted - totalSpent;

export default function BudgetPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Monthly Budget</h1>
        <Link
          href="/dashboard/budget/create"
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400"
        >
          <PlusIcon className="h-4 w-4" />
          Add Transaction
        </Link>
      </div>

      {/* Budget Overview Cards */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <BanknotesIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Total Budget</h3>
          </div>
          <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
            ${totalBudgeted.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <ArrowTrendingDownIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Total Spent</h3>
          </div>
          <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
            ${totalSpent.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <ArrowTrendingUpIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Remaining</h3>
          </div>
          <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl ${
            totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            ${totalRemaining.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <BanknotesIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Utilization</h3>
          </div>
          <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
            {((totalSpent / totalBudgeted) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="mt-8">
        <h2 className={`${lusitana.className} mb-4 text-xl`}>Budget Categories</h2>
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {mockBudget.map((item, index) => {
                  const progress = (item.spent / item.budgeted) * 100;
                  const isOverBudget = item.remaining < 0;

                  return (
                    <li key={index} className="py-5">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.category}
                          </p>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{progress.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  isOverBudget ? 'bg-red-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${item.spent.toLocaleString()} / ${item.budgeted.toLocaleString()}
                          </p>
                          <p className={`text-sm ${
                            item.remaining >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.remaining >= 0 ? '+' : ''}${item.remaining.toLocaleString()} remaining
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 