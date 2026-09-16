'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-[#EBF1F5] py-20 lg:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-[#EBF1F5] p-8 sm:p-12 text-center shadow-[6px_6px_14px_#d1d9e0,-6px_-6px_14px_#ffffff] border border-white/50"
        >
          {/* Top Emoji Icon with Soft Shadow */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EBF1F5] text-2xl shadow-[inset_2px_2px_4px_#d1d9e0,inset_-2px_-2px_4px_#ffffff] border border-white/30">
            📬
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E293B] tracking-tight mb-3">
            Stay Ahead of the Curve
          </h2>

          <p className="text-xs sm:text-sm text-[#64748B] font-medium max-w-md mx-auto mb-8 leading-relaxed">
            Get weekly curated prompts, creator tips, and AI news delivered straight to your inbox.
          </p>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#EBF1F5] px-6 py-4 text-xs sm:text-sm font-bold text-[#0F766E] shadow-[inset_2px_2px_5px_#d1d9e0,inset_-2px_-2px_5px_#ffffff] border border-white/40"
            >
              You're on the list! Check your inbox.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-[#EBF1F5] shadow-[inset_3px_3px_6px_#d1d9e0,inset_-3px_-3px_6px_#ffffff] border border-white/30">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  type="email"
                  required
                  className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1E293B] placeholder-[#94A3B8] outline-none border-none"
                />
                
                <button 
                  type="submit" 
                  className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl bg-[#0F766E] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[3px_3px_6px_#d1d9e0,-3px_-3px_6px_#ffffff] hover:bg-[#0D655E] active:scale-95 transition-all duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}

          <p className="mt-5 text-[11px] font-semibold text-[#64748B]">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}