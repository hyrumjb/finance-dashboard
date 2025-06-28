import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { ChartPieIcon, ArrowTrendingUpIcon, EyeIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Portfolio Analysis',
};

// Mock data - in a real app, this would come from your database
const mockAssetAllocation = [
  { category: 'Stocks', amount: 45000, percentage: 60, color: 'bg-blue-500' },
  { category: 'Bonds', amount: 15000, percentage: 20, color: 'bg-green-500' },
  { category: 'Real Estate', amount: 12000, percentage: 16, color: 'bg-purple-500' },
  { category: 'Cash', amount: 3000, percentage: 4, color: 'bg-gray-500' },
];

const mockPerformance = {
  totalValue: 75000,
  totalGain: 8500,
  percentageGain: 12.8,
  monthlyChange: 2.3,
  topPerformer: 'AAPL',
  topGain: 18.5,
  worstPerformer: 'TSLA',
  worstLoss: -5.2,
};

const mockInsights = [
  {
    type: 'positive',
    title: 'Diversification Score',
    value: '85/100',
    description: 'Your portfolio is well-diversified across different asset classes.',
  },
  {
    type: 'warning',
    title: 'Risk Level',
    value: 'Moderate',
    description: 'Consider adding more bonds to reduce volatility.',
  },
  {
    type: 'positive',
    title: 'Rebalancing',
    value: 'On Track',
    description: 'Your portfolio is within target allocation ranges.',
  },
];

export default function PortfolioPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Portfolio Analysis</h1>
        <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400">
          <EyeIcon className="h-4 w-4" />
          View Details
        </button>
      </div>

      {/* Portfolio Performance Overview */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <ChartPieIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Total Value</h3>
          </div>
          <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
            ${mockPerformance.totalValue.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <ArrowTrendingUpIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Total Gain</h3>
          </div>
          <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl text-green-600`}>
            +${mockPerformance.totalGain.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <ArrowTrendingUpIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Total Return</h3>
          </div>
          <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl text-green-600`}>
            +{mockPerformance.percentageGain}%
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <ArrowTrendingUpIcon className="h-5 w-5 text-gray-700" />
            <h3 className="ml-2 text-sm font-medium">Monthly Change</h3>
          </div>
          <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl text-green-600`}>
            +{mockPerformance.monthlyChange}%
          </p>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className={`${lusitana.className} mb-4 text-xl`}>Asset Allocation</h2>
          <div className="space-y-4">
            {mockAssetAllocation.map((asset, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-4 w-4 rounded-full ${asset.color}`}></div>
                  <span className="text-sm font-medium text-gray-900">{asset.category}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${asset.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{asset.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Simple pie chart visualization */}
          <div className="mt-6 flex justify-center">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
              <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 70% 0%, 70% 50%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-purple-500" style={{ clipPath: 'polygon(50% 50%, 70% 50%, 70% 0%, 86% 0%, 86% 50%)' }}></div>
              <div className="absolute inset-0 rounded-full border-8 border-gray-500" style={{ clipPath: 'polygon(50% 50%, 86% 50%, 86% 0%, 100% 0%, 100% 50%)' }}></div>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className={`${lusitana.className} mb-4 text-xl`}>Performance Insights</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-800">Top Performer</p>
                <p className="text-sm text-green-600">{mockPerformance.topPerformer}</p>
              </div>
              <span className="text-lg font-bold text-green-600">+{mockPerformance.topGain}%</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-red-800">Worst Performer</p>
                <p className="text-sm text-red-600">{mockPerformance.worstPerformer}</p>
              </div>
              <span className="text-lg font-bold text-red-600">{mockPerformance.worstLoss}%</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Portfolio Insights</h3>
            <div className="space-y-3">
              {mockInsights.map((insight, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  insight.type === 'positive' ? 'bg-green-50' : 'bg-yellow-50'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-sm font-medium ${
                        insight.type === 'positive' ? 'text-green-800' : 'text-yellow-800'
                      }`}>
                        {insight.title}
                      </p>
                      <p className={`text-sm ${
                        insight.type === 'positive' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {insight.description}
                      </p>
                    </div>
                    <span className={`text-sm font-bold ${
                      insight.type === 'positive' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {insight.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 