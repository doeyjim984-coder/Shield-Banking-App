import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle, Shield } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Message {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

interface ChatWindowProps {
  forceOpen?: boolean;
}

export const ChatWindow = ({ forceOpen }: ChatWindowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (forceOpen) setIsOpen(true);
  }, [forceOpen]);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'support', 
      text: 'Hi Alex! I\'m your Shield assistant. How can I help you with your banking today?', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulated support response
    setTimeout(() => {
      const supportMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        text: 'Thanks for reaching out! One of our agents will review your request shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, supportMsg]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-24 lg:bottom-8 right-6 lg:right-10 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass w-[calc(100vw-3rem)] sm:w-80 md:w-96 h-[500px] mb-4 rounded-[32px] overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-white/10"
          >
            {/* Header */}
            <div className="p-6 bg-[#064E3B] text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Shield Support</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium text-emerald-100/60 uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat History */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-[#F8F9FB]/50 dark:bg-navy/50"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={cn(
                  "flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
                  msg.sender === 'user' ? "ml-auto items-end" : "items-start"
                )}>
                  <div className={cn(
                    "px-4 py-3 rounded-[20px] text-sm font-medium shadow-sm",
                    msg.sender === 'user' 
                      ? "bg-[#064E3B] text-white rounded-tr-none" 
                      : "bg-white dark:bg-white/5 text-slate-800 dark:text-white border border-slate-100 dark:border-white/5 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/20 mt-1 uppercase">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-navy-light border-t border-slate-100 dark:border-white/5 shrink-0">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 p-2 rounded-2xl border border-slate-100 dark:border-white/5">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-none outline-none px-2 py-1 text-sm dark:text-white placeholder:text-slate-400"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-[#064E3B] text-white rounded-xl flex items-center justify-center hover:bg-[#065F46] transition-all active:scale-90 disabled:opacity-50 disabled:scale-100"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300",
          isOpen ? "bg-white text-slate-900 rotate-90" : "bg-[#064E3B] text-white"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};
