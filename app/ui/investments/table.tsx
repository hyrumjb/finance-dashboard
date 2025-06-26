import Image from 'next/image';
import { UpdateInvestment, DeleteInvestment } from '@/app/ui/investments/buttons';
import InvestmentStatus from '@/app/ui/investments/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvestments } from '@/app/lib/data';

export default async function InvestmentsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const investments = await fetchFilteredInvestments(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {investments?.map((investment) => (
              <div
                key={investment.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={investment.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${investment.name}'s profile picture`}
                      />
                      <p>{investment.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{investment.ticker}</p>
                  </div>
                  <InvestmentStatus status={investment.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(investment.amount)}
                    </p>
                    <p>{formatDateToLocal(investment.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvestment id={investment.id} />
                    <DeleteInvestment id={investment.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Company
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ticker
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {investments?.map((investment) => (
                <tr
                  key={investment.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={investment.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${investment.name}'s profile picture`}
                      />
                      <p>{investment.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {investment.ticker}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(investment.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(investment.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvestmentStatus status={investment.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvestment id={investment.id} />
                      <DeleteInvestment id={investment.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
