'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 100%)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '200px', background: 'radial-gradient(ellipse, rgba(124,58,237,0.2), transparent 70%)', pointerEvents: 'none' }} />
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '16px' }}>📬</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, color: '#F8FAFC', margin: '0 0 12px', letterSpacing: '-0.5px' }}>Stay Ahead of the Curve</h2>
          <p style={{ fontSize: '15px', color: '#64748B', margin: '0 0 32px', maxWidth: '420px', marginInline: 'auto' }}>Get weekly curated prompts, creator tips, and AI news delivered straight to your inbox.</p>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ padding: '16px 28px', borderRadius: '12px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', fontWeight: 600, fontSize: '15px', display: 'inline-block' }}>
              ✅ You're on the list! Check your inbox.
            </motion.div>
          ) : (
            <div style={{ display: 'flex', maxWidth: '460px', margin: '0 auto', background: 'rgba(26,32,53,0.8)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                type="email"
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: '15px 16px', color: '#F8FAFC', fontSize: '14px' }}
              />
              <button onClick={() => email && setSubmitted(true)} style={{ padding: '13px 24px', background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', border: 'none', color: '#fff', fontWeight: 600, fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Subscribe
              </button>
            </div>
          )}
          <p style={{ margin: '14px 0 0', fontSize: '12px', color: '#475569' }}>No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}