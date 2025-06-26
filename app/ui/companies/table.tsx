import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  FormattedCompaniesTable,
} from '@/app/lib/definitions';

export default async function CompaniesTable({
  companies,
}: {
  companies: FormattedCompaniesTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Companies
      </h1>
      <Search placeholder="Search customers..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {companies?.map((company) => (
                  <div
                    key={company.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={company.image_url}
                              className="rounded-full"
                              alt={`${company.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{company.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {company.ticker}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">{company.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Invested</p>
                        <p className="font-medium">{company.total_paid}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{company.total_investments} investments</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Ticker
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Investments
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Paid
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {companies.map((company) => (
                    <tr key={company.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={company.image_url}
                            className="rounded-full"
                            alt={`${company.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{company.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {company.ticker}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {company.total_investments}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {company.total_pending}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {company.total_paid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
