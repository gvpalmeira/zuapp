export interface User {
    email: string;
    id: string;
  }
  
  export interface PaymentDetail {
    quarter: number;
    date: Date;
    grossAmount: number;
    incomeTax: number;
    netAmount: number;
  }
  
  export interface SimulationParams {
    amount: number;
    term: number;
  }
  
  export interface SimulationResult {
    investmentAmount: number;
    term: number;
    effectiveRate: number;
    totalReturn: number;
    totalInterest: number;
    periodicReturns: number[];
    paymentDetails: PaymentDetail[];
    totals: {
      grossAmount: number;
      incomeTax: number;
      netAmount: number;
    };
  }

  // types/index.ts

export interface SearchParamProps {
  searchParams: {
    id?: string;
    page?: string;
  }
}

export interface Account {
  appwriteItemId: string;
  bank_name: string;
  current_balance: number;
  transactions?: Transaction[];
  // Add other account properties as needed
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: 'credit' | 'debit';
  // Add other transaction properties as needed
}

export interface User {
  $id: string;
  nome_completo: string;
  // Add other user properties as needed
}

export interface AccountsResponse {
  data: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

