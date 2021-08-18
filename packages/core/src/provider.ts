export interface DepositAdded {
  depositor: string;
  depositee: string;
  amount: number;
}

export interface DepositReleased {
  depositor: string;
  depositee: string;
  amount: number;
}

export interface ProviderAPI<T> {
  addDeposit: (amount?: T, depositee?: string) => Promise<void>;
  releaseDeposit: (depositee?: string) => Promise<void>;
  releaseDeposits: () => Promise<void>;
  hasDeposit: (depositee?: string) => Promise<boolean>;
  apiEndpoint: () => Promise<string>;
}
