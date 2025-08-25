export interface SendMoneyForm {
  email: string;
  amount: number;
}
export interface CashForm {
  email: string;
  amount: number;
}

export interface SearchedUser {
  _id: string;
  email: string;
  phone?: string;
}

export interface SearchResults {
  users: SearchedUser[];
}