import {
  CompanyField,
  CompaniesTableType,
  InvestmentForm,
  InvestmentsTable,
  LatestInvestmentRaw,
  Profit,
} from './definitions';
import { formatCurrency } from './utils';
import { sql } from '@/app/lib/db';

export async function fetchRevenue() {
  try {
    const data = await sql<Profit[]>`SELECT * FROM profit`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch profit data.');
  }
}

export async function fetchLatestInvestments() {
  try {
    const data = await sql<LatestInvestmentRaw[]>`
      SELECT investments.amount, companies.name, companies.image_url, companies.ticker, investments.id
      FROM investments
      JOIN companies ON investments.company_id = companies.id
      ORDER BY investments.date DESC
      LIMIT 5`;

    const latestInvestments = data.map((investment) => ({
      ...investment,
      amount: formatCurrency(investment.amount),
    }));
    return latestInvestments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest investments.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const investmentCountPromise = sql`SELECT COUNT(*) FROM investments`;
    const companyCountPromise = sql`SELECT COUNT(*) FROM companies`;
    const investmentStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      investmentCountPromise,
      companyCountPromise,
      investmentStatusPromise,
    ]);

    const numberOfInvestments = Number(data[0][0].count ?? '0');
    const numberOfCompanies = Number(data[1][0].count ?? '0');
    const totalPaidInvestments = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvestments = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCompanies,
      numberOfInvestments,
      totalPaidInvestments,
      totalPendingInvestments,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvestments(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const investments = await sql<InvestmentsTable[]>`
      SELECT
        investments.id,
        investments.amount,
        investments.date,
        investments.status,
        companies.name,
        companies.ticker,
        companies.image_url
      FROM investments
      JOIN companies ON investments.company_id = companies.id
      WHERE
        companies.name ILIKE ${`%${query}%`} OR
        companies.ticker ILIKE ${`%${query}%`} OR
        investments.amount::text ILIKE ${`%${query}%`} OR
        investments.date::text ILIKE ${`%${query}%`} OR
        investments.status ILIKE ${`%${query}%`}
      ORDER BY investments.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return investments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch investments.');
  }
}

export async function fetchInvestmentsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM investments
    JOIN companies ON investments.company_id = companies.id
    WHERE
      companies.name ILIKE ${`%${query}%`} OR
      companies.ticker ILIKE ${`%${query}%`} OR
      investments.amount::text ILIKE ${`%${query}%`} OR
      investments.date::text ILIKE ${`%${query}%`} OR
      investments.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of investments.');
  }
}

export async function fetchInvestmentById(id: string) {
  try {
    const data = await sql<InvestmentForm[]>`
      SELECT
        investments.id,
        investments.company_id,
        investments.amount,
        investments.status
      FROM investments
      WHERE investments.id = ${id};
    `;

    const investment = data.map((investment) => ({
      ...investment,
      // Convert amount from cents to dollars
      amount: investment.amount / 100,
    }));
    
    console.log(investment);
    return investment[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch investment.');
  }
}

export async function fetchCompanies() {
  try {
    const companies = await sql<CompanyField[]>`
      SELECT
        id,
        name
      FROM companies
      ORDER BY name ASC
    `;

    return companies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all companies.');
  }
}

export async function fetchFilteredCompanies(query: string) {
  try {
    const data = await sql<CompaniesTableType[]>`
		SELECT
		  companies.id,
		  companies.name,
		  companies.ticker,
		  companies.image_url,
		  COUNT(investments.id) AS total_investments,
		  SUM(CASE WHEN investments.status = 'pending' THEN investments.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN investments.status = 'paid' THEN investments.amount ELSE 0 END) AS total_paid
		FROM companies
		LEFT JOIN investments ON companies.id = investments.company_id
		WHERE
		  companies.name ILIKE ${`%${query}%`} OR
        companies.ticker ILIKE ${`%${query}%`}
		GROUP BY companies.id, companies.name, companies.ticker, companies.image_url
		ORDER BY companies.name ASC
	  `;

    const companies = data.map((company) => ({
      ...company,
      total_pending: formatCurrency(company.total_pending),
      total_paid: formatCurrency(company.total_paid),
    }));

    return companies;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch company table.');
  }
}
