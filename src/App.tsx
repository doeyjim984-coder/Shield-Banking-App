import { useState, useEffect } from 'react';
import { 
  Home, 
  CreditCard, 
  ArrowRightLeft, 
  User, 
  Search, 
  Bell, 
  Plus, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Send, 
  Receipt, 
  Smartphone,
  PieChart,
  Shield as ShieldIcon,
  Settings,
  LogOut,
  Target,
  TrendingUp,
  Briefcase,
  Zap
} from 'lucide-react';
import { cn } from './utils/cn';
import { SpendingChart } from './features/dashboard/SpendingChart';
import { TransactionList } from './features/transactions/TransactionList';
import { VirtualCard } from './features/virtual-card/VirtualCard';
import { TransferFlow } from './features/transfer/TransferFlow';
import { MOCK_TRANSACTIONS, MOCK_CONTACTS, MOCK_BALANCE } from './utils/mock-data';
import { Skeleton } from './components/Skeleton';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'home' | 'cards' | 'transfer' | 'profile' | 'wealth' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(MOCK_BALANCE);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleTransfer = (amount: number, contact: any) => {
    setBalance(prev => prev - amount);
    setTransactions(prev => [
      {
        id: Math.random().toString(),
        name: contact.name,
        amount: -amount,
        date: new Date().toISOString().split('T')[0],
        category: 'Transfer',
        type: 'debit',
      },
      ...prev
    ]);
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'transfer', icon: ArrowRightLeft, label: 'Send' },
    { id: 'wealth', icon: PieChart, label: 'Wealth' },
    { id: 'cards', icon: CreditCard, label: 'Cards' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FB] dark:bg-navy transition-colors duration-500 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab as Tab)} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Responsive Header */}
        <header className="h-16 flex items-center justify-between px-6 lg:px-10 bg-[#F8F9FB]/80 dark:bg-navy/80 backdrop-blur-xl sticky top-0 z-40 shrink-0 transition-colors">
          <div className="flex items-center gap-6">
            <h1 className="hidden lg:block text-2xl font-bold dark:text-white text-slate-800">Dashboard</h1>
            
            <div className="lg:hidden flex items-center gap-2">
               <div className="w-8 h-8 bg-[#064E3B] rounded-lg rotate-45" />
               <h1 className="text-lg font-bold dark:text-white text-slate-800">Shield</h1>
            </div>

            <div className="hidden lg:flex items-center gap-3 bg-white dark:bg-white/5 px-4 py-2 rounded-full w-[400px] shadow-sm border border-slate-100 dark:border-white/5">
              <Search size={16} className="text-slate-400 dark:text-white/20" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-slate-400 dark:text-white/80"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <ThemeToggle />
            <button className="p-2 relative glass dark:bg-white/5 rounded-full hover:scale-110 transition-transform">
               <Bell size={18} className="text-slate-600 dark:text-white/80" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-white dark:border-navy" />
            </button>
            <div className="flex items-center gap-3 pl-2">
               <div className="text-right hidden lg:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mb-0.5">Alex Marco</p>
                  <p className="text-[10px] font-medium text-slate-400 dark:text-white/30 truncate max-w-[100px]">alex@shield.com</p>
               </div>
               <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200 p-0.5 shadow-sm">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" className="w-full h-full rounded-full" />
               </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-32 lg:pb-10 p-6 lg:p-10 transition-all">
          <div className="max-w-[1400px] mx-auto">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    <Skeleton className="h-64 w-full rounded-[32px]" />
                    <Skeleton className="h-[400px] w-full rounded-[32px]" />
                  </div>
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <Skeleton className="h-[200px] w-full rounded-[32px]" />
                    <Skeleton className="h-[400px] w-full rounded-[32px]" />
                  </div>
                </div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {activeTab === 'home' && (
                    <>
                      {/* Dashboard Main Area */}
                      <div className="lg:col-span-8 flex flex-col gap-8">
                        
                        {/* Smart Wallet Section */}
                        <section className="bg-white dark:bg-navy-light rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-white/5 relative group">
                          <div className="flex justify-between items-start mb-10">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#064E3B] rounded-full flex items-center justify-center text-white">
                                   <CreditCard size={18} />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Smart Wallet</h3>
                             </div>
                             <button className="bg-[#064E3B] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-[#065F46] transition-all active:scale-95 shadow-lg shadow-emerald-900/10">
                                <Plus size={16} /> Add New
                             </button>
                          </div>

                          <div className="flex flex-col gap-8">
                             <div>
                                <p className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest mb-2">Total Savings</p>
                                <div className="flex items-baseline gap-3">
                                   <h2 className="text-4xl font-bold dark:text-white text-slate-800 tracking-tight">
                                     {balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                   </h2>
                                   <div className="text-[10px] font-bold text-[#064E3B] bg-[#D1FAE5] px-2 py-0.5 rounded-full">
                                      +12.01%
                                   </div>
                                </div>
                             </div>

                             <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-white/5">
                                {[
                                  { label: 'Current Balance', amount: 19820.00, icon: <ArrowRightLeft size={16} />, color: 'text-blue-500', bg: 'bg-blue-50' },
                                  { label: 'Income', amount: 19820.00, icon: <ArrowDownLeft size={16} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                  { label: 'Expenses', amount: 19820.00, icon: <ArrowUpRight size={16} />, color: 'text-orange-500', bg: 'bg-orange-50' },
                                ].map((item) => (
                                  <div key={item.label}>
                                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mb-3", item.bg, item.color)}>
                                       {item.icon}
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase mb-1">{item.label}</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">${item.amount.toLocaleString()}</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                        </section>

                        {/* Cash Flow Section (Chart) */}
                        <SpendingChart />

                        <TransactionList transactions={transactions} />
                      </div>

                      {/* Side Widgets Area */}
                      <div className="lg:col-span-4 flex flex-col gap-8">
                         
                         {/* Quick Send Widget */}
                         <section className="bg-white dark:bg-navy-light rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-white/5">
                            <div className="flex justify-between items-center mb-6 px-1">
                               <h3 className="font-bold text-slate-900 dark:text-white">Quick Send</h3>
                               <button className="text-xs font-bold text-[#064E3B]">See All</button>
                            </div>
                            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                               {MOCK_CONTACTS.map((contact) => (
                                 <div key={contact.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-[#064E3B] p-0.5 transition-all">
                                       <img src={contact.avatar} alt={contact.name} className="w-full h-full rounded-full" />
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-500 dark:text-white/60">{contact.name.split(' ')[0]}</span>
                                 </div>
                               ))}
                            </div>
                         </section>

                         {/* Card Widget */}
                         <section className="scale-95 lg:scale-100 -my-4 transition-transform hover:scale-[1.02] duration-500 origin-center">
                            <VirtualCard card={{ number: '4532789012342345', expiry: '05/36', cvv: '482', type: 'Visa' }} />
                         </section>

                         {/* Action Buttons */}
                         <div className="grid grid-cols-2 gap-4">
                            <button 
                              onClick={() => setActiveTab('transfer')}
                              className="bg-[#064E3B] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#065F46] transition-all active:scale-95"
                            >
                               <ArrowDownLeft size={18} /> Deposit
                            </button>
                            <button 
                              onClick={() => setActiveTab('transfer')}
                              className="bg-white border border-slate-200 text-slate-800 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95"
                            >
                               <ArrowRightLeft size={18} /> Transfer
                            </button>
                         </div>

                         {/* Quick Actions (Circular Icons) */}
                         <section className="bg-white dark:bg-navy-light rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-white/5">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
                            <div className="grid grid-cols-4 gap-4">
                               {[
                                 { label: 'Transfer', icon: <Send size={20} />, bg: 'bg-emerald-50 text-emerald-600' },
                                 { label: 'Bills', icon: <Receipt size={20} />, bg: 'bg-blue-50 text-blue-600' },
                                 { label: 'Mobile', icon: <Smartphone size={20} />, bg: 'bg-teal-50 text-teal-600' },
                                 { label: 'More', icon: <Plus size={20} />, bg: 'bg-slate-50 text-slate-600' },
                               ].map((action) => (
                                 <div key={action.label} className="flex flex-col items-center gap-2 cursor-pointer group">
                                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform", action.bg)}>
                                       {action.icon}
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400">{action.label}</span>
                                 </div>
                               ))}
                            </div>
                         </section>
                      </div>
                    </>
                  )}

                  {activeTab === 'transfer' && (
                    <div className="lg:col-span-12 max-w-2xl mx-auto w-full py-8">
                       <TransferFlow contacts={MOCK_CONTACTS} onComplete={handleTransfer} />
                    </div>
                  )}

                  {activeTab === 'wealth' && (
                    <div className="lg:col-span-12 flex flex-col gap-10">
                       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                         <div>
                           <h2 className="text-3xl font-bold dark:text-white text-slate-800">Wealth Management</h2>
                           <p className="text-slate-400 dark:text-white/40 font-bold text-xs uppercase tracking-widest mt-1">Growth & Portfolio Strategy</p>
                         </div>
                         <div className="flex gap-4">
                           <button className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                             <TrendingUp size={18} className="text-emerald-500" /> Market Insights
                           </button>
                           <button className="bg-[#064E3B] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#065F46] transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/10">
                             <Plus size={18} /> Invest Now
                           </button>
                         </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {/* Portfolio Allocation Card */}
                         <div className="lg:col-span-2 bg-white dark:bg-navy-light rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-white/5">
                            <h3 className="font-bold text-lg mb-8">Asset Allocation</h3>
                            <div className="flex flex-col lg:flex-row items-center gap-12">
                               <div className="relative w-48 h-48">
                                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                     <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="currentColor" strokeWidth="3" className="text-slate-100 dark:text-white/5" />
                                     <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#064E3B" strokeWidth="3" strokeDasharray="60 40" strokeDashoffset="0" />
                                     <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#3D5AFE" strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="-60" />
                                     <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#F97316" strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="-85" />
                                  </svg>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                                     <span className="text-xs font-bold text-slate-400 uppercase">Portfolio</span>
                                     <span className="text-xl font-bold">100%</span>
                                  </div>
                               </div>
                               <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                  {[
                                    { label: 'Stocks & Equities', value: '60%', color: 'bg-[#064E3B]' },
                                    { label: 'Cryptocurrencies', value: '25%', color: 'bg-[#3D5AFE]' },
                                    { label: 'Real Estate', value: '15%', color: 'bg-[#F97316]' },
                                    { label: 'Cash & Bonds', value: '0%', color: 'bg-slate-100' },
                                  ].map(item => (
                                    <div key={item.label} className="p-4 rounded-2xl border border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                                       <div className="flex items-center gap-3 mb-2">
                                          <div className={cn("w-3 h-3 rounded-full", item.color)} />
                                          <span className="text-[11px] font-bold text-slate-400 uppercase">{item.label}</span>
                                       </div>
                                       <p className="text-lg font-bold">{item.value}</p>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>

                         {/* Savings Vault */}
                         <div className="bg-[#064E3B] rounded-[32px] p-8 shadow-xl shadow-emerald-900/20 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-125 transition-transform duration-700" />
                            <div className="relative z-10 h-full flex flex-col">
                               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                                  <Target size={24} />
                               </div>
                               <h3 className="text-xl font-bold mb-2">Shield Savings Vault</h3>
                               <p className="text-emerald-100/60 text-xs font-medium mb-8 leading-relaxed">Secure your future with high-yield interest accounts up to 4.5% APY.</p>
                               <div className="mt-auto">
                                  <div className="flex justify-between items-end mb-2">
                                     <p className="text-2xl font-bold">$12,400.00</p>
                                     <p className="text-xs font-bold text-emerald-200">+4.5% APY</p>
                                  </div>
                                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                     <div className="w-[70%] h-full bg-emerald-300 rounded-full" />
                                  </div>
                               </div>
                            </div>
                         </div>
                       </div>

                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <section className="bg-white dark:bg-navy-light rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-white/5">
                             <h3 className="font-bold text-lg mb-6">Investment Strategy</h3>
                             <div className="flex flex-col gap-4">
                                {[
                                  { title: 'Aggressive Growth', desc: 'Focus on high-risk tech and crypto assets.', icon: <Zap size={20} />, status: 'Active' },
                                  { title: 'Stable Dividends', desc: 'Low-risk blue-chip stocks and ETFs.', icon: <Briefcase size={20} />, status: 'Disabled' },
                                ].map(strategy => (
                                  <div key={strategy.title} className="p-5 rounded-2xl border border-slate-50 dark:border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer group bg-slate-50/50 dark:bg-white/[0.02]">
                                     <div className="flex justify-between items-start">
                                        <div className="flex gap-4">
                                           <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                                              {strategy.icon}
                                           </div>
                                           <div>
                                              <p className="font-bold text-sm">{strategy.title}</p>
                                              <p className="text-[10px] font-medium text-slate-400 dark:text-white/30 uppercase mt-0.5">{strategy.desc}</p>
                                           </div>
                                        </div>
                                        <div className={cn("text-[8px] font-black uppercase px-2 py-1 rounded-md", strategy.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-white/5 text-slate-500')}>
                                           {strategy.status}
                                        </div>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </section>
                          <div className="bg-white dark:bg-navy-light rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-white/5 flex flex-col justify-center items-center text-center">
                             <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-inner">
                                <PieChart size={32} />
                             </div>
                             <h3 className="text-xl font-bold mb-2">Wealth Analytics</h3>
                             <p className="text-slate-400 dark:text-white/40 text-xs font-bold uppercase tracking-widest max-w-xs">Detailed performance metrics and yield projections are calculated in real-time.</p>
                          </div>
                       </div>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="lg:col-span-12 flex flex-col gap-10 max-w-4xl mx-auto w-full py-8">
                       <div>
                          <h2 className="text-3xl font-bold dark:text-white text-slate-800">System Settings</h2>
                          <p className="text-slate-400 dark:text-white/40 font-bold text-xs uppercase tracking-widest mt-1">Privacy, Security & Preferences</p>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {[
                            { group: 'Security', items: [
                              { label: 'Two-Factor Authentication', enabled: true },
                              { label: 'Biometric FaceID Login', enabled: true },
                              { label: 'Automatic Account Lock', enabled: false },
                            ]},
                            { group: 'Notifications', items: [
                              { label: 'Push Notifications', enabled: true },
                              { label: 'Email Reports', enabled: true },
                              { label: 'Marketing Offers', enabled: false },
                            ]}
                          ].map(group => (
                            <div key={group.group} className="bg-white dark:bg-navy-light rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-white/5">
                               <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest text-slate-400">{group.group}</h3>
                               <div className="flex flex-col gap-6">
                                  {group.items.map(item => (
                                    <div key={item.label} className="flex justify-between items-center group cursor-pointer">
                                       <span className="text-sm font-bold text-slate-600 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.label}</span>
                                       <div className={cn("w-10 h-6 rounded-full relative p-1 transition-colors duration-300", item.enabled ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10')}>
                                          <div className={cn("w-4 h-4 bg-white rounded-full transition-transform duration-300", item.enabled ? 'translate-x-4' : 'translate-x-0')} />
                                       </div>
                                    </div>
                                  ))}
                               </div>
                            </div>
                          ))}
                       </div>

                       <div className="bg-red-50 dark:bg-red-500/5 rounded-3xl p-8 border border-red-200 dark:border-red-500/10">
                          <h3 className="text-red-600 dark:text-red-400 font-bold mb-2">Danger Zone</h3>
                          <p className="text-red-900/40 dark:text-red-400/40 text-[10px] font-bold uppercase tracking-widest mb-6 leading-relaxed">Permanently delete your account and all associated data. This action cannot be undone.</p>
                          <button className="bg-red-600 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-900/10">Delete Account</button>
                       </div>
                    </div>
                  )}

                  {activeTab === 'profile' && (
                    <div className="lg:col-span-12 max-w-4xl mx-auto w-full py-8 flex flex-col gap-10">
                       <div className="bg-white dark:bg-navy-light rounded-[48px] p-10 lg:p-14 shadow-sm border border-slate-100 dark:border-white/5 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                          <div className="relative group cursor-pointer">
                             <div className="w-40 h-40 rounded-[56px] border-4 border-[#064E3B] p-2 bg-white dark:bg-navy rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden shadow-2xl">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile" className="w-full h-full rounded-[40px]" />
                             </div>
                             <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-white dark:border-navy rounded-2xl flex items-center justify-center text-white shadow-xl">
                                <ShieldIcon size={20} />
                             </div>
                          </div>
                          <div className="flex-1 text-center lg:text-left">
                             <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                                <h2 className="text-4xl font-bold dark:text-white text-slate-800">Alex Marco</h2>
                                <span className="bg-[#D1FAE5] text-[#064E3B] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-[#064E3B]/10">Platinum Member</span>
                             </div>
                             <p className="text-slate-400 dark:text-white/40 font-bold text-xs uppercase tracking-[0.2em] mb-8">Executive Digital Asset Manager</p>
                             <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Joined</p>
                                   <p className="font-bold">March 2024</p>
                                </div>
                                <div>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Country</p>
                                   <p className="font-bold">United Kingdom</p>
                                </div>
                                <div className="hidden lg:block">
                                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                                   <p className="font-bold text-emerald-500">Verified</p>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <section className="bg-white dark:bg-navy-light rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-white/5">
                             <h3 className="font-bold text-lg mb-6">Personal Information</h3>
                             <div className="flex flex-col gap-6">
                                {[
                                  { label: 'Full Name', value: 'Alex Bronson Marco' },
                                  { label: 'Email Address', value: 'alex@shield.com' },
                                  { label: 'Phone Number', value: '+44 7911 123456' },
                                ].map(info => (
                                  <div key={info.label} className="flex justify-between items-center border-b border-slate-50 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                                     <span className="text-xs font-bold text-slate-400 dark:text-white/20 uppercase">{info.label}</span>
                                     <span className="text-sm font-bold text-slate-900 dark:text-white">{info.value}</span>
                                  </div>
                                ))}
                             </div>
                          </section>
                          <section className="flex flex-col gap-4">
                             <button className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 w-full p-6 rounded-[32px] flex justify-between items-center hover:bg-slate-50 transition-all group">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600">
                                      <Settings size={20} />
                                   </div>
                                   <span className="font-bold">Account Preferences</span>
                                </div>
                                <ArrowRightLeft size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                             </button>
                             <button className="bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 w-full p-6 rounded-[32px] flex justify-between items-center hover:bg-red-100 transition-all group">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 bg-red-100 dark:bg-red-500/20 rounded-xl flex items-center justify-center text-red-600">
                                      <LogOut size={20} />
                                   </div>
                                   <span className="font-bold text-red-600">Secure Sign Out</span>
                                </div>
                                <LogOut size={18} className="text-red-300" />
                             </button>
                          </section>
                       </div>
                    </div>
                  )}

                  {activeTab === 'cards' && (
                    <div className="lg:col-span-12 flex flex-col gap-8">
                       <h2 className="text-3xl font-bold text-slate-800">My Cards</h2>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <VirtualCard card={{ number: '4532789012345678', expiry: '12/28', cvv: '482', type: 'Visa' }} />
                          <VirtualCard card={{ number: '1234567890123456', expiry: '06/29', cvv: '119', type: 'Mastercard' }} />
                       </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Bottom Navigation - Centered & Premium */}
        <nav className="fixed bottom-0 left-0 w-full p-4 pb-8 bg-gradient-to-t from-slate-50 dark:from-navy via-slate-50/90 dark:via-navy/90 to-transparent z-50 lg:hidden pointer-events-none flex justify-center">
          <div className="glass h-16 w-full max-w-[400px] rounded-3xl flex items-center justify-around px-2 border-slate-200 dark:border-white/5 pointer-events-auto shadow-2xl transition-colors duration-500">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 w-14 h-12 transition-all relative group",
                    isActive ? "text-[#064E3B] dark:text-[#A7F3D0]" : "text-slate-400 dark:text-white/30"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navTab"
                      className="absolute inset-0 bg-[#064E3B]/10 dark:bg-white/10 rounded-2xl"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
                  <span className="text-[9px] font-bold tracking-tight uppercase relative z-10 leading-none">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </main>
    </div>
  );
}

export default App;
