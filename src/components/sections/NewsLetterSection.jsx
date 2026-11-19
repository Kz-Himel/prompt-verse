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
    <section className="bg-[var(--bg)] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl neu-card p-8 sm:p-12 text-center"
        >
          {/* Top Emoji Icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl neu-card-inset text-2xl">
            📬
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text)] tracking-tight mb-3">
            Stay Ahead of the Curve
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium max-w-md mx-auto mb-8 leading-relaxed">
            Get weekly curated prompts, creator tips, and AI news delivered straight to your inbox.
          </p>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 rounded-2xl neu-card-inset px-6 py-4 text-xs sm:text-sm font-bold text-[var(--primary)]"
            >
              You're on the list! Check your inbox.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl neu-card-inset">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  type="email"
                  required
                  className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm font-medium text-[var(--text)] placeholder-[var(--text-muted)] outline-none border-none"
                />
                
                <button 
                  type="submit" 
                  className="w-full sm:w-auto shrink-0 neu-button-primary px-6 py-3 text-xs sm:text-sm font-bold"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}

          <p className="mt-5 text-[11px] font-semibold text-[var(--text-muted)]">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
