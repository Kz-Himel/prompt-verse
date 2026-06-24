'use client';

import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Instant Access',
    desc: 'Browse and use thousands of ready-made prompts across every AI tool — no waiting, no setup.',
    color: '#F59E0B',
  },
  {
    icon: '🔐',
    title: 'Secure & Trusted',
    desc: 'JWT-based auth, role-based access, and encrypted data keeps your account and prompts safe.',
    color: '#10B981',
  },
  {
    icon: '💰',
    title: 'Earn as Creator',
    desc: 'Monetize your expertise by publishing premium prompts. Get paid for every subscription.',
    color: '#7C3AED',
  },
  {
    icon: '🤖',
    title: 'Multi-Tool Support',
    desc: 'Prompts optimized for ChatGPT, Claude, Gemini, Midjourney, DALL·E, and more platforms.',
    color: '#06B6D4',
  },
  {
    icon: '📊',
    title: 'Creator Analytics',
    desc: 'Track copies, bookmarks, and engagement on your prompts with real-time charts.',
    color: '#EF4444',
  },
  {
    icon: '⭐',
    title: 'Community Reviews',
    desc: 'Ratings and reviews from real users help you discover what actually works in the wild.',
    color: '#8B5CF6',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      style={{
        padding: '110px 24px',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(circle at center, black 45%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Gradient Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-180px',
          left: '-180px',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: '-200px',
          bottom: '-200px',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: '70px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '7px 16px',
              borderRadius: '999px',
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.12)',
              color: '#7C3AED',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}
          >
            Why PromptVerse?
          </span>

          <h2
            style={{
              fontSize: 'clamp(32px,5vw,52px)',
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              margin: '0 0 20px',
            }}
          >
            Everything You Need to <br />
            <span
              style={{
                background:
                  'linear-gradient(135deg,#7C3AED,#06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Master AI Prompting
            </span>
          </h2>

          <p
            style={{
              fontSize: '17px',
              color: '#64748B',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            A platform built from the ground up for AI enthusiasts,
            developers, and creative professionals.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill,minmax(320px,1fr))',
            gap: '24px',
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid #E2E8F0',
                borderRadius: '24px',
                padding: '32px',
                backdropFilter: 'blur(20px)',
                boxShadow:
                  '0 10px 40px rgba(15,23,42,0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Accent Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '120px',
                  height: '120px',
                  borderRadius: '999px',
                  background: `${f.color}12`,
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '18px',
                  background: `${f.color}15`,
                  border: `1px solid ${f.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  marginBottom: '22px',
                }}
              >
                {f.icon}
              </div>

              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#0F172A',
                  margin: '0 0 12px',
                }}
              >
                {f.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: '#64748B',
                  lineHeight: 1.8,
                  fontSize: '15px',
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}