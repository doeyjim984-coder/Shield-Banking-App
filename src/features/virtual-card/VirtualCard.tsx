import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Card } from '../../types';
import { cn } from '../../utils/cn';

interface VirtualCardProps {
  card: Card;
}

export const VirtualCard = ({ card }: VirtualCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full flex justify-center py-8">
      <div
        className="relative w-[340px] h-[210px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full"
        >
          {/* Front of Card */}
          <div
            className={cn(
              "absolute inset-0 w-full h-full rounded-[28px] p-8 overflow-hidden",
              "bg-gradient-to-br from-[#064E3B] via-[#065F46] to-[#043427] shadow-2xl",
              "border border-white/20"
            )}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Animated Mesh Background */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-12 -mt-12 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/20 rounded-full -ml-12 -mb-12 blur-2xl" />
            
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#A7F3D0] uppercase">
                  Shield Premium
                </span>
                <div className="w-10 h-8 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-600/40 relative border border-yellow-200/20 shadow-inner">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10" />
                  <div className="absolute top-0 left-1/3 w-[1px] h-full bg-black/10" />
                  <div className="absolute top-0 left-2/3 w-[1px] h-full bg-black/10" />
                </div>
              </div>
              <div className="text-xl font-black italic tracking-tighter text-white">
                {card.type.toUpperCase()}
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-6">
              <div className="text-[22px] font-medium tracking-[0.15em] text-[#D1FAE5]">
                {card.number.replace(/(.{4})/g, '$1 ')}
              </div>
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[8px] font-bold text-[#A7F3D0]/40 uppercase tracking-widest">
                    Card Holder
                  </span>
                  <span className="text-sm font-medium tracking-wide text-white">
                    BRONSON DALTON
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 items-end">
                  <span className="text-[8px] font-bold text-[#A7F3D0]/40 uppercase tracking-widest">
                    Expiry Date
                  </span>
                  <span className="text-sm font-medium tracking-wide text-white">
                    {card.expiry}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div
            className={cn(
              "absolute inset-0 w-full h-full rounded-[28px] p-8 overflow-hidden",
              "bg-gradient-to-br from-indigo-900 to-navy shadow-2xl",
              "border border-white/20"
            )}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="absolute top-12 left-0 w-full h-12 bg-navy-dark shadow-inner" />
            
            <div className="mt-20 flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg">
              <div className="w-3/4 h-6 bg-white/20 rounded-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[8px] font-bold text-white/40 uppercase mb-1">CVV</span>
                <span className="text-sm font-mono font-bold tracking-widest">{card.cvv}</span>
              </div>
            </div>

            <div className="mt-12 flex justify-between items-center opacity-40">
              <div className="text-[8px] font-medium max-w-[160px] leading-tight">
                This card is property of Shield Financial Corp. If found, please return to any branch or call 1-800-SHIELD.
              </div>
              <div className="text-lg font-black italic tracking-tighter">
                {card.type.toUpperCase()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
