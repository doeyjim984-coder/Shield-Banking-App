import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, User, DollarSign } from 'lucide-react';
import type { Contact } from '../../types';
import { cn } from '../../utils/cn';

interface TransferFlowProps {
  contacts: Contact[];
  onComplete: (amount: number, contact: Contact) => void;
}

export const TransferFlow = ({ contacts, onComplete }: TransferFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleComplete = () => {
    if (selectedContact) {
      onComplete(parseFloat(amount), selectedContact);
      nextStep();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="glass rounded-3xl p-6 overflow-hidden">
      <AnimatePresence mode="wait" custom={step}>
        {step === 1 && (
          <motion.div
            key="step1"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col gap-6"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User size={20} className="text-electric" /> Select Contact
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => { setSelectedContact(contact); nextStep(); }}
                  className={cn(
                    "flex flex-col items-center gap-3 p-4 rounded-3xl transition-all active:scale-95",
                    selectedContact?.id === contact.id ? "bg-electric" : "bg-white/5"
                  )}
                >
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-2xl" />
                  <span className="text-sm font-medium">{contact.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            custom={2}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <button onClick={prevStep} className="text-white/40 font-medium">Back</button>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign size={20} className="text-electric" /> Enter Amount
              </h3>
            </div>
            
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold opacity-40">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-5xl font-bold w-48 text-center outline-none placeholder:text-white/10"
                  autoFocus
                />
              </div>
              <p className="text-sm text-white/40">Available: $12,450.80</p>
            </div>

            <button
              disabled={!amount}
              onClick={handleComplete}
              className="w-full bg-electric text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-20 active:scale-[0.98] transition-transform"
            >
              Continue <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            custom={3}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center gap-6 py-8"
          >
            <div className="w-20 h-20 rounded-full bg-green-400 flex items-center justify-center">
              <Check size={40} className="text-navy" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Success!</h3>
              <p className="text-white/60">
                You've sent <span className="text-white font-semibold">${amount}</span> to <span className="text-white font-semibold">{selectedContact?.name}</span>
              </p>
            </div>
            <button
              onClick={() => { setStep(1); setAmount(''); setSelectedContact(null); }}
              className="w-full bg-white/10 py-4 rounded-2xl font-semibold active:scale-[0.98] transition-transform"
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
