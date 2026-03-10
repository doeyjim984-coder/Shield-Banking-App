import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

type ChartTab = 'Income' | 'Expenses' | 'Savings';

const CHART_DATA: Record<ChartTab, { month: string; value: number; active?: boolean }[]> = {
  Income: [
    { month: 'Jan', value: 12 }, { month: 'Feb', value: 14 }, { month: 'Mar', value: 13 },
    { month: 'Apr', value: 18 }, { month: 'May', value: 16 }, { month: 'Jun', value: 15 },
    { month: 'Jul', value: 17 }, { month: 'Aug', value: 22, active: true }, { month: 'Sep', value: 19 },
    { month: 'Oct', value: 18 }, { month: 'Nov', value: 20 }, { month: 'Dec', value: 19 },
  ],
  Expenses: [
    { month: 'Jan', value: 8 }, { month: 'Feb', value: 12 }, { month: 'Mar', value: 10 },
    { month: 'Apr', value: 15 }, { month: 'May', value: 14 }, { month: 'Jun', value: 11 },
    { month: 'Jul', value: 13 }, { month: 'Aug', value: 19, active: true }, { month: 'Sep', value: 12 },
    { month: 'Oct', value: 10 }, { month: 'Nov', value: 12 }, { month: 'Dec', value: 11 },
  ],
  Savings: [
    { month: 'Jan', value: 4 }, { month: 'Feb', value: 2 }, { month: 'Mar', value: 3 },
    { month: 'Apr', value: 3 }, { month: 'May', value: 2 }, { month: 'Jun', value: 4 },
    { month: 'Jul', value: 4 }, { month: 'Aug', value: 3, active: true }, { month: 'Sep', value: 7 },
    { month: 'Oct', value: 8 }, { month: 'Nov', value: 8 }, { month: 'Dec', value: 8 },
  ],
};

export const SpendingChart = () => {
  const [activeTab, setActiveTab] = useState<ChartTab>('Income');
  const data = CHART_DATA[activeTab];
  const maxValue = useMemo(() => Math.max(...data.map(d => d.value)), [data]);

  const totalValue = useMemo(() => {
    const sum = data.reduce((acc, d) => acc + d.value * 1000, 0);
    return sum.toLocaleString('en-US', {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2
    });
  }, [data]);

  return (
    <div className="flex flex-col h-full w-full py-4 bg-white dark:bg-navy-light rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-white/5">
      <div className="flex justify-between items-center mb-8">
         <h3 className="font-bold text-lg dark:text-white text-slate-800">Cash Flow</h3>
         <div className="flex gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-full">
            {(['Income', 'Expenses', 'Savings'] as ChartTab[]).map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all",
                  activeTab === tab 
                    ? "bg-white dark:bg-navy text-slate-900 dark:text-white shadow-sm" 
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-white/60"
                )}
              >
                {tab}
              </button>
            ))}
         </div>
      </div>

      <div className="flex justify-between items-end mb-8">
         <div className="flex flex-col gap-1">
           <p className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-widest">Yearly {activeTab}</p>
           <AnimatePresence mode="wait">
             <motion.h4 
               key={activeTab}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 10 }}
               className="text-3xl font-bold text-slate-900 dark:text-white"
             >
               {totalValue}
             </motion.h4>
           </AnimatePresence>
         </div>
         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            Yearly <motion.span animate={{ rotate: 180 }} className="inline-block transition-transform">^</motion.span>
         </div>
      </div>

      <div className="flex-1 flex items-end justify-between gap-1 lg:gap-2 px-1">
        {data.map((item, i) => (
          <div key={`${activeTab}-${item.month}`} className="flex-1 flex flex-col items-center gap-3 group">
            <div className="relative w-full flex flex-col items-center">
              {item.active && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-10 bg-[#0A0E27] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg z-10 whitespace-nowrap"
                >
                  ${(item.value * 450).toLocaleString()}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0A0E27] rotate-45" />
                </motion.div>
              )}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{ 
                  delay: i * 0.03, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                className={cn(
                  "w-full max-w-[12px] rounded-full transition-all duration-300",
                  item.active 
                    ? (activeTab === 'Expenses' ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : activeTab === 'Savings' ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-[#064E3B] shadow-[0_0_15px_rgba(6,78,59,0.4)]') 
                    : 'bg-slate-100 dark:bg-white/5 group-hover:bg-slate-200 dark:group-hover:bg-white/10'
                )}
              />
            </div>
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.02 }}
              className={cn(
                "text-[10px] font-bold transition-colors",
                item.active ? 'text-slate-900 dark:text-white' : 'text-slate-400'
              )}
            >
              {item.month}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
};
