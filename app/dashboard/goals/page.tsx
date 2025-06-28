import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { FlagIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Financial Goals',
};

// Mock data - in a real app, this would come from your database
const mockGoals = [
  {
    id: '1',
    name: 'Emergency Fund',
    targetAmount: 15000,
    currentAmount: 12000,
    targetDate: '2024-12-31',
    category: 'emergency' as const,
    priority: 'high' as const,
  },
  {
    id: '2',
    name: 'Down Payment',
    targetAmount: 50000,
    currentAmount: 25000,
    targetDate: '2025-06-30',
    category: 'savings' as const,
    priority: 'high' as const,
  },
  {
    id: '3',
    name: 'Vacation Fund',
    targetAmount: 5000,
    currentAmount: 3000,
    targetDate: '2024-08-15',
    category: 'savings' as const,
    priority: 'medium' as const,
  },
];

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const categoryColors = {
  savings: 'bg-blue-500',
  investment: 'bg-green-500',
  debt: 'bg-red-500',
  emergency: 'bg-purple-500',
};

export default function GoalsPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Financial Goals</h1>
        <Link
          href="/dashboard/goals/create"
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400"
        >
          <PlusIcon className="h-4 w-4" />
          Add Goal
        </Link>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const remaining = goal.targetAmount - goal.currentAmount;
          const daysUntilTarget = Math.ceil(
            (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );

          return (
            <div key={goal.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FlagIcon className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${priorityColors[goal.priority]}`}>
                  {goal.priority}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${categoryColors[goal.category]}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-medium">${goal.currentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Target:</span>
                  <span className="font-medium">${goal.targetAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-medium text-red-600">${remaining.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due in:</span>
                  <span className="font-medium">{daysUntilTarget} days</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-400">
                  Update Progress
                </button>
                <button className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 