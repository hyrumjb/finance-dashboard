import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  companies: UserGroupIcon,
  pending: ClockIcon,
  investments: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvestments,
    numberOfCompanies,
    totalPaidInvestments,
    totalPendingInvestments,
  } = await fetchCardData();

  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Investing" value={totalPaidInvestments} type="collected" />
      <Card title="Pending" value={totalPendingInvestments} type="pending" />
      <Card title="Total Investments" value={numberOfInvestments} type="invoices" />
      <Card
        title="Total Companies"
        value={numberOfCompanies}
        type="companies"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'investments' | 'companies' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
