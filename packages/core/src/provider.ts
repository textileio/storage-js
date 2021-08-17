export interface AddDeposit {
  sender: string;
  account: string;
  amount: number;
}

export interface ReleaseDeposit {
  account: string;
  amount: number;
}

export interface ProviderAPI<T> {
  addDeposit: (amount?: T, account?: string) => Promise<void>;
  releaseDeposit: (account?: string) => Promise<void>;
  releaseDeposits: () => Promise<void>;
  hasDeposit: (account?: string) => Promise<boolean>;
  apiEndpoint: () => Promise<string>;
}
