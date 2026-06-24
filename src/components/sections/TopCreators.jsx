'use client';

import { motion } from 'framer-motion';

const TOP_CREATORS = [
  {
    name: 'Alex Turner',
    role: 'Content Strategist',
    prompts: 48,
    rating: 4.9,
    badge: '🥇',
    color: '#F59E0B',
    initials: 'AT',
  },
  {
    name: 'Sara Kim',
    role: 'AI Artist',
    prompts: 36,
    rating: 4.8,
    badge: '🥈',
    color: '#94A3B8',
    initials: 'SK',
  },
  {
    name: 'Dev Patel',
    role: 'Full-Stack Dev',
    prompts: 52,
    rating: 5.0,
    badge: '👑',
    color: '#7C3AED',
    initials: 'DP',
  },
  {
    name: 'Mia Chen',
    role: 'Marketing Expert',
    prompts: 29,
    rating: 4.7,
    badge: '🥉',
    color: '#CD7C2F',
    initials: 'MC',
  },
  {
    name: 'Leo Ross',
    role: 'Brand Designer',
    prompts: 41,
    rating: 4.9,
    badge: '⭐',
    color: '#06B6D4',
    initials: 'LR',
  },
  {
    name: 'Nina Patel',
    role: 'Sales Copywriter',
    prompts: 33,
    rating: 4.8,
    badge: '⭐',
    color: '#10B981',
    initials: 'NP',
  },
];

export default function TopCreators() {
  return (
    <section
      style={{
        padding: '110px 24px',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Grid */}
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
          right: '-180px',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '-180px',
          bottom: '-180px',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
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
          transition={{ duration: 0.6 }}
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
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.12)',
              color: '#F59E0B',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}
          >
            🏆 Top Creators
          </span>

          <h2
            style={{
              fontSize: 'clamp(32px,5vw,52px)',
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              margin: '0 0 18px',
            }}
          >
            Meet the Best Prompt Creators
          </h2>

          <p
            style={{
              fontSize: '17px',
              color: '#64748B',
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            These creators are shaping the future of AI productivity.
            Follow them and never miss a great prompt.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {TOP_CREATORS.map((creator, i) => (
            <motion.div
              key={creator.name}
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
                padding: '28px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
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
                  width: '110px',
                  height: '110px',
                  borderRadius: '999px',
                  background: `${creator.color}12`,
                }}
              />

              {/* Avatar */}
              <div
                style={{
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${creator.color}30, ${creator.color}10)`,
                    border: `2px solid ${creator.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '17px',
                    color: creator.color,
                  }}
                >
                  {creator.initials}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '-5px',
                    right: '-5px',
                    fontSize: '18px',
                    lineHeight: 1,
                  }}
                >
                  {creator.badge}
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: '0 0 4px',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#0F172A',
                  }}
                >
                  {creator.name}
                </h3>

                <p
                  style={{
                    margin: '0 0 14px',
                    fontSize: '14px',
                    color: '#64748B',
                  }}
                >
                  {creator.role}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#64748B',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        color: creator.color,
                      }}
                    >
                      {creator.prompts}
                    </span>{' '}
                    prompts
                  </span>

                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#F59E0B',
                    }}
                  >
                    ★ {creator.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}