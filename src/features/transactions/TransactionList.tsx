import { ShoppingBag, Car, Wallet, Utensils, Film, Send, Filter } from 'lucide-react';
import type { Transaction } from '../../types';
import { cn } from '../../utils/cn';

const CATEGORY_ICONS = {
  Food: { icon: Utensils, color: 'text-[#064E3B]', bg: 'bg-[#D1FAE5]' },
  Transport: { icon: Car, color: 'text-blue-500', bg: 'bg-blue-50' },
  Salary: { icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  Shopping: { icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-50' },
  Entertainment: { icon: Film, color: 'text-pink-500', bg: 'bg-pink-50' },
  Transfer: { icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
};

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
        <button className="flex items-center gap-2 text-[10px] font-bold text-slate-500 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full hover:bg-slate-50 transition-colors">
           <Filter size={14} /> Filter
        </button>
      </div>
      
      <div className="bg-white dark:bg-navy-light rounded-[32px] overflow-hidden border border-slate-100 dark:border-white/5 shadow-sm">
        <div className="flex flex-col">
          {transactions.map((tx, i) => {
            const cat = CATEGORY_ICONS[tx.category] || CATEGORY_ICONS.Shopping;
            return (
              <div
                key={tx.id}
                className={cn(
                  "p-6 flex items-center justify-between group transition-colors hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer",
                  i !== transactions.length - 1 && "border-b border-slate-50 dark:border-white/5"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110", cat.bg)}>
                    <cat.icon size={20} className={cat.color} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{tx.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{tx.category} • {tx.date}</p>
                  </div>
                </div>
                <div className={cn(
                  "font-bold text-sm",
                  tx.amount > 0 ? "text-emerald-500" : "text-slate-900 dark:text-white"
                )}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
