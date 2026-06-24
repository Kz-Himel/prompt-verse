'use client';

import { motion } from 'framer-motion';

const REVIEWS = [
  { name: 'John D.', role: 'Marketer', text: 'PromptVault completely transformed how I use ChatGPT. I went from 2 hours of content writing to 20 minutes. The quality difference is night and day.', rating: 5, initials: 'JD', color: '#7C3AED' },
  { name: 'Sarah M.', role: 'Designer', text: "As a creator, I've earned more than I expected. The platform is beautifully designed and the community support is phenomenal. Highly recommended.", rating: 5, initials: 'SM', color: '#06B6D4' },
  { name: 'David R.', role: 'Developer', text: 'Best marketplace for AI prompts, period. I found coding prompts that saved my team dozens of engineering hours every single week.', rating: 5, initials: 'DR', color: '#10B981' },
  { name: 'Priya K.', role: 'Startup Founder', text: "We use PromptVault for everything — pitch decks, emails, product copy. It's like having a genius copywriter on call 24/7.", rating: 5, initials: 'PK', color: '#F59E0B' },
  { name: 'Marco T.', role: 'YouTuber', text: 'The Midjourney prompts here are absolutely stunning. My thumbnail engagement went up 40% in one month. Worth every penny.', rating: 5, initials: 'MT', color: '#EF4444' },
  { name: 'Yuna L.', role: 'Copywriter', text: "I used to struggle with writer's block daily. Now I have hundreds of proven prompts at my fingertips. PromptVault is a game-changer.", rating: 4, initials: 'YL', color: '#8B5CF6' },
];

const StarRating = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1,2,3,4,5].map(s => (
      <span key={s} style={{ fontSize: '14px', color: s <= rating ? '#F59E0B' : '#374151' }}>★</span>
    ))}
  </div>
);

export default function CustomerReviews() {
  return (
    <section style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-100px', left: '-200px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '100px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>❤️ Community Love</span>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#F8FAFC', margin: '0 0 16px', letterSpacing: '-0.8px' }}>What Our Users Say</h2>
          <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '480px', margin: '0 auto' }}>Over 12,500 creators and buyers trust PromptVault to supercharge their workflow.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ background: 'rgba(26,32,53,0.7)', border: '1px solid rgba(148,163,184,0.08)', borderRadius: '18px', padding: '26px', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: '12px', right: '16px', fontSize: '64px', fontFamily: 'Georgia, serif', color: 'rgba(124,58,237,0.08)', lineHeight: 1, userSelect: 'none' }}>"</div>
              <StarRating rating={r.rating} />
              <p style={{ margin: '16px 0 20px', fontSize: '14px', color: '#CBD5E1', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>"{r.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(148,163,184,0.08)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${r.color}30, ${r.color}10)`, border: `1.5px solid ${r.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', color: r.color, fontFamily: 'Syne, sans-serif' }}>
                  {r.initials}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#F8FAFC' }}>{r.name}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}