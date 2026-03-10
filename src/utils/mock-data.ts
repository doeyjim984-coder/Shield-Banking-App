import type { Transaction, Contact } from '../types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', name: 'Apple Store', amount: -1299.00, date: '2026-03-05', category: 'Shopping', type: 'debit' },
  { id: '2', name: 'Monthly Salary', amount: 5400.00, date: '2026-03-01', category: 'Salary', type: 'credit' },
  { id: '3', name: 'Starbucks', amount: -12.50, date: '2026-03-06', category: 'Food', type: 'debit' },
  { id: '4', name: 'Uber', amount: -24.00, date: '2026-03-05', category: 'Transport', type: 'debit' },
  { id: '5', name: 'Netflix', amount: -15.99, date: '2026-03-04', category: 'Entertainment', type: 'debit' },
  { id: '6', name: 'Whole Foods', amount: -89.45, date: '2026-03-03', category: 'Food', type: 'debit' },
];

export const MOCK_CONTACTS: Contact[] = [
  { id: 'c1', name: 'Sarah Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'c2', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: 'c3', name: 'Elena Gomez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
  { id: 'c4', name: 'Alex Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
];

export const MOCK_BALANCE = 12450.80;
