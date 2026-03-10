export interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: 'Food' | 'Transport' | 'Salary' | 'Shopping' | 'Entertainment' | 'Transfer';
  type: 'debit' | 'credit';
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastTransfer?: string;
}

export interface Card {
  number: string;
  expiry: string;
  cvv: string;
  type: 'Visa' | 'Mastercard';
}
