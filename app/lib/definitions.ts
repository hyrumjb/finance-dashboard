// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Company = {
  id: string;
  name: string;
  ticker: string;
  image_url: string;
};

export type Investment = {
  id: string;
  company_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Profit = {
  month: string;
  revenue: number;
};

export type LatestInvestment = {
  id: string;
  name: string;
  image_url: string;
  ticker: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvestmentRaw = Omit<LatestInvestment, 'amount'> & {
  amount: number;
};

export type InvestmentsTable = {
  id: string;
  company_id: string;
  name: string;
  ticker: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CompaniesTableType = {
  id: string;
  name: string;
  ticker: string;
  image_url: string;
  total_investments: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCompaniesTable = {
  id: string;
  name: string;
  ticker: string;
  image_url: string;
  total_investments: number;
  total_pending: string;
  total_paid: string;
};

export type CompanyField = {
  id: string;
  name: string;
};

export type InvestmentForm = {
  id: string;
  company_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
