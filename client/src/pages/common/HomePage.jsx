/**
 * src/pages/common/HomePage.jsx
 *
 * Public Landing Page — Stripe / Shopify / Alibaba B2B Marketplace Layout.
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  Box,
  Globe,
  Zap,
  Users,
  Building2,
  Search,
  Filter,
  TrendingUp,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

// ── Animation Variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Platform Statistics ───────────────────────────────────────────────────────
const STATS = [
  { value: '2,000+', label: 'Verified Textile Mills', subtext: 'Inspected & Compliance Checked' },
  { value: '50,000+', label: 'Wholesale Fabric Listings', subtext: 'GSM & Weave Specs Verified' },
  { value: '15,000+', label: 'Active B2B Buyers', subtext: 'Garment Brands & Retailers' },
  { value: '$500M+', label: 'GMV Sourced', subtext: 'Secure Escrow Transactions' },
];

// ── Fabric Categories ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Cotton', icon: Box, description: 'Combed, carded & organic cotton twills', count: '14,200+ Fabrics' },
  { name: 'Silk', icon: Globe, description: 'Mulberry silk, satin & raw dupioni', count: '6,800+ Fabrics' },
  { name: 'Wool', icon: Layers, description: 'Merino wool, worsted & flannel blends', count: '5,100+ Fabrics' },
  { name: 'Linen', icon: Box, description: 'Pure flax linen & cotton linen knits', count: '8,400+ Fabrics' },
  { name: 'Synthetic', icon: Zap, description: 'Polyester, rayon & performance blends', count: '12,900+ Fabrics' },
  { name: 'Denim', icon: Layers, description: 'Raw selvedge, stretch & recycled denim', count: '4,600+ Fabrics' },
];

// ── B2B How It Works Workflow ─────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Users,
    title: 'Register & Verify Business',
    desc: 'Create a verified buyer or supplier account in under 2 minutes with tax & business identification.',
  },
  {
    step: '02',
    icon: Search,
    title: 'Discover & Inspect Fabrics',
    desc: 'Filter by GSM, weave type, min order quantity, and pricing. Request physical swatch samples directly.',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Direct Wholesale Sourcing',
    desc: 'Place bulk purchase orders directly with verified mills backed by transparent milestone escrow protection.',
  },
];

function HomePage() {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen text-[var(--color-text-primary)] font-sans">
      {/* ── 1. Hero Section (Split 2-Column B2B Layout) ────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800">
        {/* Subtle Ambient Light Glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[450px] bg-[#0070F3]/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* ── Left Column: Headline & Action CTAs (Cols 1-7) ──────────────── */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge Pill */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 shadow-sm"
              >
                <Sparkles size={14} className="text-sky-400" />
                <span>Next-Gen B2B Wholesale Textile Exchange</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.1}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white"
              >
                The Operating System for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-400">
                  Textile Commerce
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.2}
                className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl"
              >
                Connect directly with verified fabric manufacturers and textile mills. 
                Source premium fabrics at scale with transparent B2B wholesale pricing, verified GSM specs, and escrow payment protection.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.3}
                className="pt-2 flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto"
              >
                <Link
                  to="/register?role=buyer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#0070F3] hover:bg-[#0059B2] text-white transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  Start Sourcing
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/register?role=supplier"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 transition-all duration-200"
                >
                  <Building2 size={16} />
                  Become a Supplier
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.4}
                className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-400 text-xs font-semibold"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>ISO Certified Mills</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-sky-400 shrink-0" />
                  <span>Verified Suppliers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-amber-400 shrink-0" />
                  <span>Escrow Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-indigo-400 shrink-0" />
                  <span>Pan-India Logistics</span>
                </div>
              </motion.div>

            </div>

            {/* ── Right Column: Interactive Marketplace Preview (Cols 8-12) ───── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="lg:col-span-5 w-full"
            >
              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl space-y-4">
                
                {/* Header Mockup Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Wholesale Exchange</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 text-[11px]">
                    <Search size={12} />
                    <span>Search 50k+ fabrics...</span>
                  </div>
                </div>

                {/* Main Product Showcase Card */}
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/10 text-sky-400 border border-blue-500/20 mb-1">
                        Cotton Twill • 240 GSM
                      </span>
                      <h4 className="font-bold text-sm text-white">Organic Combed Cotton Twill Fabric</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Direct from Shivam Textile Mills • Surat, Gujarat</p>
                    </div>
                    <span className="shrink-0 px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded border border-emerald-500/20">
                      Verified Mill
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center">
                    <div className="p-2 rounded bg-slate-900/80">
                      <p className="text-[10px] text-slate-400 font-medium">Price / Meter</p>
                      <p className="text-xs font-extrabold text-white mt-0.5">₹185.00</p>
                    </div>
                    <div className="p-2 rounded bg-slate-900/80">
                      <p className="text-[10px] text-slate-400 font-medium">Min Order (MOQ)</p>
                      <p className="text-xs font-extrabold text-white mt-0.5">500 meters</p>
                    </div>
                    <div className="p-2 rounded bg-slate-900/80">
                      <p className="text-[10px] text-slate-400 font-medium">Stock Available</p>
                      <p className="text-xs font-extrabold text-emerald-400 mt-0.5">12,500 m</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <TrendingUp size={14} className="text-emerald-400" />
                      Bulk Discount applied above 2,000m
                    </span>
                    <Link
                      to="/products"
                      className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 text-xs"
                    >
                      View Product
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Activity Ticker Widget */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-sky-400 flex items-center justify-center shrink-0">
                      <Box size={14} />
                    </div>
                    <div>
                      <p className="text-slate-200 font-bold text-[11px]">5,000m Linen Blend Fulfilled</p>
                      <p className="text-[10px] text-slate-400">Buyer: Garment Export Ltd, Mumbai</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">2 mins ago</span>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. Statistics Section (Clean High-Contrast Grid) ───────────────────── */}
      <section className="py-12 lg:py-16 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STATS.map(({ value, label, subtext }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.08}
                className="p-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] shadow-[var(--shadow-subtle)] space-y-1 text-left"
              >
                <p className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
                  {value}
                </p>
                <p className="text-xs lg:text-sm font-bold text-[var(--color-text-primary)]">
                  {label}
                </p>
                <p className="text-[11px] font-medium text-[var(--color-text-muted)]">
                  {subtext}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Category Grid Section (Fabric Sourcing Hub) ────────────────────── */}
      <section className="py-16 lg:py-24 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-secondary)]">
                Wholesale Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
                Explore Fabrics by Category
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-brand-secondary)] hover:text-[var(--color-brand-hover)] transition-colors"
            >
              Browse All Products
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map(({ name, icon: Icon, description, count }, i) => (
              <motion.div
                key={name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={i * 0.06}
              >
                <Link
                  to="/products"
                  className="group ui-card ui-card-interactive block p-6 h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand-secondary)] flex items-center justify-center transition-transform group-hover:scale-110">
                        <Icon size={20} />
                      </div>
                      <span className="text-xs font-bold text-[var(--color-text-muted)] bg-[var(--color-surface-muted)] px-2.5 py-1 rounded-full border border-[var(--color-border-subtle)]">
                        {count}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-secondary)] transition-colors">
                        {name} Fabrics
                      </h3>
                      <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-bold text-[var(--color-text-primary)]">
                    <span>Source {name}</span>
                    <ChevronRight size={16} className="text-[var(--color-text-muted)] group-hover:translate-x-1 group-hover:text-[var(--color-brand-secondary)] transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. How It Works Section (Streamlined B2B Workflow) ────────────────── */}
      <section className="py-16 lg:py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-secondary)]">
              Streamlined Procurement
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
              How TextileHub Operates
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium">
              Eliminating intermediaries to deliver mill-direct pricing, verified quality specs, and escrow security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="relative p-8 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] shadow-[var(--shadow-card)] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)] text-white flex items-center justify-center shadow-sm">
                    <Icon size={22} />
                  </div>
                  <span className="text-3xl font-black text-[var(--color-border)] opacity-60">
                    {step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[var(--color-text-secondary)] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. CTA Conversion Section ────────────────────────────────────────── */}
      <section className="relative py-20 lg:py-24 bg-slate-950 text-white text-center border-t border-slate-800 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0070F3]/15 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
          >
            Ready to Scale Your Textile Sourcing?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
            className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto"
          >
            Join thousands of verified garment manufacturers, apparel brands, and textile mills trading directly on India's premier B2B platform.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <Link
              to="/register?role=buyer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-[#0070F3] hover:bg-[#0059B2] text-white transition-all duration-200 shadow-lg shadow-blue-500/25"
            >
              Start Sourcing For Free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/register?role=supplier"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 transition-all duration-200"
            >
              List Your Mill
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
