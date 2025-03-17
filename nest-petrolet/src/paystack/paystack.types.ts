export enum PaystackCurrency {
  NGN = 'NGN',
  USD = 'USD',
  GHS = 'GHS',
  ZAR = 'ZAR',
  KES = 'KES',
}

export interface InitializePaystackTransactionPayload {
  email: string;
  amount: string;
  currency?: PaystackCurrency;
  reference?: string;
  callback_url?: string;
  plan?: string;
  invoice_limit?: number;
  metadata?: string;
  channels?: (
    | 'card'
    | 'bank'
    | 'ussd'
    | 'qr'
    | 'mobile_money'
    | 'bank_transfer'
    | 'eft'
  )[];
  split_code?: string;
  subaccount?: string;
  transaction_charge?: number;
  bearer?: string;
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: any;
  meta?: {
    total: number;
    skipped: number;
    perPage: number;
    page: number;
    pageCount: number;
  };
}

export interface InitializedPaystackTransactionResponse
  extends PaystackResponse {
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}
