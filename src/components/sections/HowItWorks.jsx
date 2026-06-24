'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const STEPS = [
  { step: '01', title: 'Create Your Account', desc: 'Sign up in seconds with email or Google. Your account is free — no credit card needed to start exploring.', icon: '🚀', color: '#7C3AED' },
  { step: '02', title: 'Discover or Publish', desc: 'Browse thousands of verified prompts, or publish your own masterpiece and reach a global audience.', icon: '🔍', color: '#06B6D4' },
  { step: '03', title: 'Use & Earn Instantly', desc: 'Copy prompts to your AI tool with one click. Creators earn recurring revenue from premium subscriptions.', icon: '💸', color: '#10B981' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '100px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>How It Works</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#F8FAFC', margin: '0 0 16px', letterSpacing: '-0.8px' }}>Up and Running in Minutes</h2>
          <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '480px', margin: '0 auto' }}>Three simple steps to start creating, discovering, and earning with AI prompts.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0', position: 'relative' }}>
          <div className="connector-line" style={{ position: 'absolute', top: '52px', left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)' }} />
          {STEPS.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }} style={{ padding: '0 24px', textAlign: 'center', position: 'relative' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `linear-gradient(135deg, ${s.color}22, ${s.color}08)`, border: `2px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', position: 'relative', boxShadow: `0 0 30px ${s.color}20` }}>
                <span style={{ fontSize: '28px' }}>{s.icon}</span>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '28px', height: '28px', borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: '#fff', fontFamily: 'Syne, sans-serif' }}>
                  {s.step.replace('0', '')}
                </div>
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 700, color: '#F8FAFC', margin: '0 0 12px' }}>{s.title}</h3>
              <p style={{ margin: '0 auto', fontSize: '14px', color: '#64748B', lineHeight: 1.7, maxWidth: '280px' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ marginTop: '80px', background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 100%)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '24px', padding: '60px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '200px', background: 'radial-gradient(ellipse, rgba(124,58,237,0.15), transparent 70%)', pointerEvents: 'none' }} />
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: '#F8FAFC', margin: '0 0 14px', letterSpacing: '-0.5px' }}>Start Your AI Journey Today</h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', margin: '0 0 32px', maxWidth: '500px', marginInline: 'auto' }}>Join 12,500+ creators who are already discovering and publishing world-class AI prompts.</p>
          <Link href="/auth/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '15px 36px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '16px', boxShadow: '0 0 40px rgba(124,58,237,0.4)' }}>
            Get Started for Free <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </motion.div>
      </div>
      <style>{`@media (max-width: 768px) { .connector-line { display: none; } }`}</style>
    </section>
  );
}