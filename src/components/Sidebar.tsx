import { Home, CreditCard, ArrowRightLeft, User, PieChart, MessageCircle, Settings } from 'lucide-react';
import { cn } from '../utils/cn';

const navItems = [
  { id: 'home', icon: Home, label: 'Dashboard' },
  { id: 'transfer', icon: ArrowRightLeft, label: 'Transfers' },
  { id: 'cards', icon: CreditCard, label: 'Cards' },
  { id: 'wealth', icon: PieChart, label: 'Wealth' },
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'support', icon: MessageCircle, label: 'Support' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen bg-white dark:bg-navy border-r border-slate-100 dark:border-white/5 sticky top-0 left-0 z-50 p-6 shrink-0 transition-colors">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
        <div className="w-8 h-8 bg-[#064E3B] rounded-lg flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
           <div className="w-4 h-4 bg-white rounded-sm -rotate-45 group-hover:rotate-0 transition-transform" />
        </div>
        <h1 className="text-xl font-bold tracking-tight dark:text-white text-slate-900">Shield</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all group",
                isActive 
                  ? "bg-[#D1FAE5] dark:bg-white/10 text-[#064E3B] dark:text-white" 
                  : "text-slate-400 dark:text-white/30 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white/80"
              )}
            >
              <item.icon size={18} className={cn(
                "transition-colors",
                isActive ? "text-[#064E3B] dark:text-white" : "text-slate-400 dark:text-white/30 group-hover:text-slate-900"
              )} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Upgrade Card - Matching Zolopio's Kickoff Plan */}
      <div className="mt-6 flex flex-col gap-6">
        <div className="bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] dark:from-[#064E3B]/20 dark:to-[#064E3B]/10 p-5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
          <h4 className="font-bold text-sm text-[#064E3B] dark:text-[#A7F3D0] mb-1 relative z-10">Kickoff Plan!</h4>
          <p className="text-[10px] font-medium text-[#064E3B]/60 dark:text-[#A7F3D0]/60 leading-relaxed mb-4 relative z-10">
            Upgrade to the enterprise plan for great discounts!
          </p>
          <button className="w-full bg-[#064E3B] dark:bg-[#064E3B] text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#065F46] transition-colors shadow-lg shadow-emerald-900/10">
            Upgrade Now
          </button>
        </div>

        <div className="flex flex-col gap-1 px-2 border-t border-slate-100 dark:border-white/5 pt-4">
           <button onClick={() => setActiveTab('settings')} className="flex items-center gap-3 px-2 py-2 text-slate-400 dark:text-white/30 hover:text-slate-900 transition-colors text-sm font-medium group">
              <Settings size={18} className="group-hover:rotate-90 transition-transform" />
              Setting
           </button>
           <button className="flex items-center gap-3 px-2 py-2 text-slate-400 dark:text-white/30 hover:text-red-500 transition-colors text-sm font-medium group">
              <User size={18} className="rotate-180" />
              Logout
           </button>
        </div>
      </div>
    </aside>
  );
};
