import { Send, Download, Receipt, Plus, Smartphone } from 'lucide-react';
import { cn } from '../../utils/cn';

const actions = [
  { id: 'send', label: 'Send', icon: Send, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'request', label: 'Request', icon: Download, color: 'bg-blue-50 text-blue-600' },
  { id: 'bills', label: 'Bills', icon: Receipt, color: 'bg-purple-50 text-purple-600' },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, color: 'bg-teal-50 text-teal-600' },
  { id: 'more', label: 'More', icon: Plus, color: 'bg-slate-50 text-slate-600' },
];

export const QuickActions = () => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
      {actions.map((action) => (
        <button
          key={action.id}
          className="flex flex-col items-center gap-3 group shrink-0"
        >
          <div className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm border border-slate-100 dark:border-white/5",
            action.color
          )}>
            <action.icon size={22} strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};
