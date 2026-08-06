/**
 * src/pages/common/HomePage.jsx
 *
 * Public landing page — Premium SaaS styling (Linear / Vercel vibe).
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users, Box, Globe, BarChart } from 'lucide-react';

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.32, 0.72, 0, 1] },
  }),
};

// ── Placeholder data ──────────────────────────────────────────────────────────
const STATS = [
  { value: '2,000+', label: 'Verified Suppliers' },
  { value: '50,000+', label: 'Products Listed' },
  { value: '15,000+', label: 'Active Buyers' },
  { value: '$500M+', label: 'GMV Facilitated' },
];

const CATEGORIES = [
  { name: 'Cotton',     icon: <Box />, description: 'Breathable & versatile' },
  { name: 'Silk',       icon: <Globe />, description: 'Premium & luxurious' },
  { name: 'Wool',       icon: <Box />, description: 'Warm & durable' },
  { name: 'Linen',      icon: <Globe />, description: 'Natural & textured' },
  { name: 'Synthetic',  icon: <Zap />, description: 'High-performance blends' },
  { name: 'Denim',      icon: <Box />, description: 'Classic & sturdy' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: <Users size={24} />,
    title: 'Register Your Account',
    desc: 'Sign up as a buyer or supplier in under 2 minutes.',
  },
  {
    step: '02',
    icon: <Zap size={24} />,
    title: 'Browse or List',
    desc: 'Buyers discover products. Suppliers create catalogues.',
  },
  {
    step: '03',
    icon: <Shield size={24} />,
    title: 'Trade with Confidence',
    desc: 'Secure payments, verified partners, transparent tracking.',
  },
];

function HomePage() {
  return (
    <div className="bg-[var(--color-bg)]">
      {/* ── 1. Hero Section (Vercel / Linear Dark Aesthetic) ────────────────── */}
      <section className="relative overflow-hidden bg-black text-white min-h-[90vh] flex flex-col justify-center border-b border-[#333]">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[800px] h-[500px] bg-[var(--color-brand-secondary)] opacity-20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-32 z-10">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 border border-[#333] bg-white/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-secondary)] animate-pulse shadow-[0_0_10px_var(--color-brand-secondary)]" />
            <span className="text-[#a1a1aa]">TextileHub 2.0 is now live</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] max-w-5xl"
          >
            The Operating System for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#888]">
              Textile Commerce
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mt-8 text-lg sm:text-xl max-w-2xl text-[#a1a1aa] font-medium"
          >
            Connect directly with verified fabric manufacturers. 
            Source premium textiles at scale with modern, secure, and transparent B2B infrastructure.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              to="/register?role=buyer"
              className="px-8 py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(0,112,243,0.3)] hover:shadow-[0_0_40px_rgba(0,112,243,0.5)]"
              style={{ backgroundColor: 'var(--color-brand-secondary)', color: '#fff' }}
            >
              Start Sourcing
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/register?role=supplier"
              className="px-8 py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 bg-white/5 border border-white/10 hover:bg-white/10"
            >
              Become a Supplier
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Stats Section (Clean Minimalist) ──────────────────────────── */}
      <section className="py-20 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="text-center group"
              >
                <p className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text)] transition-transform duration-300 group-hover:-translate-y-1">
                  {value}
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--color-muted)]">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Categories Section (Glassmorphism Cards) ─────────────────────── */}
      <section className="py-24 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
              Browse by Category
            </h2>
            <p className="mt-4 text-lg text-[var(--color-muted)] font-medium">
              Thousands of premium products across every fabric type.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map(({ name, icon, description }, i) => (
              <motion.div
                key={name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i * 0.05}
                className="group relative cursor-pointer rounded-2xl p-6 text-center bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-[var(--color-brand-secondary)] mb-4 p-3 rounded-full bg-[var(--color-brand-accent)] group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </div>
                  <p className="font-bold text-sm text-[var(--color-text)] tracking-wide">
                    {name}
                  </p>
                  <p className="text-xs mt-2 text-[var(--color-muted)] font-medium">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How It Works (SaaS Features Style) ───────────────────────────── */}
      <section className="py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
              Built for Modern Trade
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {HOW_IT_WORKS.map(({ step, icon, title, desc }, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="relative text-left p-8 rounded-3xl bg-[var(--color-bg)] border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-[var(--color-brand-secondary)] text-white shadow-[var(--shadow-glow)]">
                  {icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">
                  {title}
                </h3>
                <p className="text-[var(--color-muted)] font-medium leading-relaxed">
                  {desc}
                </p>
                <div className="absolute top-8 right-8 text-5xl font-extrabold text-[var(--color-border)] opacity-50 pointer-events-none">
                  {step}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA Banner (Gradient Stripe) ─────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden bg-black text-white text-center">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--color-brand-secondary)_0%,transparent_100%)] opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6"
          >
            Ready to scale?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="mb-10 text-xl text-[#a1a1aa] font-medium"
          >
            Join the fastest-growing B2B textile network today.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(0,112,243,0.3)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)]"
              style={{ backgroundColor: 'var(--color-brand-secondary)', color: '#fff' }}
            >
              Get Started for Free
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
