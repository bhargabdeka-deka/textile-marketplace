/**
 * src/pages/common/HomePage.jsx
 *
 * B2B Textile Marketplace Landing Page — World-Class Enterprise SaaS Design.
 */

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
  TrendingUp,
  Layers,
  ChevronRight
} from 'lucide-react';

// ── Platform Statistics ───────────────────────────────────────────────────────
const STATS = [
  { value: '2,000+', label: 'Verified Textile Mills', subtext: 'Audited & compliance checked' },
  { value: '50,000+', label: 'Fabric Listings', subtext: 'GSM & weave specs verified' },
  { value: '15,000+', label: 'Active B2B Buyers', subtext: 'Garment brands & retailers' },
  { value: '$500M+', label: 'GMV Sourced', subtext: 'Secured via escrow protocol' },
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

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Users,
    title: 'Register & Verify Business',
    desc: 'Create a verified buyer or supplier account with tax & business identification credentials.',
  },
  {
    step: '02',
    icon: Search,
    title: 'Discover & Inspect Fabrics',
    desc: 'Filter by GSM, weave type, MOQ, and pricing. Request physical swatch samples directly.',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Direct Wholesale Sourcing',
    desc: 'Place bulk purchase orders directly with verified mills backed by milestone escrow protection.',
  },
];

function HomePage() {
  return (
    <div className="bg-[#FAFBFC] min-h-screen text-[#374151] font-sans antialiased">
      {/* ── 1. Hero Section ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* ── Left Column: Headline & Action CTAs (Cols 1-7) ──────────────── */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-[#374151] border border-[#E5E7EB]">
                <span>India's Verified B2B Textile Exchange</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-[56px] sm:leading-[1.1] font-semibold tracking-tight text-[#111827]">
                Direct Wholesale Textile Sourcing <br />
                <span className="text-[#2563EB]">From Verified Mills</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base text-[#374151] font-normal leading-relaxed max-w-xl">
                Source premium fabrics directly from audited manufacturers. Access transparent wholesale pricing, verified GSM specs, custom MOQs, and milestone escrow payment protection.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/register?role=buyer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors shadow-sm"
                >
                  Start Sourcing Fabrics
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/register?role=supplier"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white hover:bg-gray-50 text-[#111827] border border-[#E5E7EB] transition-colors shadow-sm"
                >
                  <Building2 size={16} className="text-[#6B7280]" />
                  Register as Textile Mill
                </Link>
              </div>

              {/* Trust Features */}
              <div className="pt-6 border-t border-[#EEF2F7] grid grid-cols-2 sm:grid-cols-4 gap-4 text-[#6B7280] text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#6B7280] shrink-0" />
                  <span>Verified Mills</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#6B7280] shrink-0" />
                  <span>Spec Inspections</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock size={16} className="text-[#6B7280] shrink-0" />
                  <span>Escrow Payments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck size={16} className="text-[#6B7280] shrink-0" />
                  <span>Pan-India Dispatch</span>
                </div>
              </div>

            </div>

            {/* ── Right Column: SaaS Dashboard Showcase (Cols 8-12) ───────────── */}
            <div className="lg:col-span-5 w-full hidden sm:block">
              <div className="rounded-2xl bg-white border border-[#E5E7EB] p-5 shadow-sm space-y-4">
                
                {/* Header Mockup Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#EEF2F7] text-xs text-[#6B7280]">
                  <div className="font-medium text-[#111827]">
                    Wholesale Exchange Feed
                  </div>
                  <div className="flex items-center gap-1.5 text-[#6B7280] bg-[#FAFBFC] px-2.5 py-1 rounded-lg border border-[#E5E7EB] text-[13px]">
                    <Search size={14} />
                    <span>Search 50k+ listings</span>
                  </div>
                </div>

                {/* Product Showcase Card */}
                <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-gray-100 text-[#374151] border border-[#E5E7EB] mb-1.5">
                        Cotton Twill • 240 GSM
                      </span>
                      <h4 className="font-medium text-base text-[#111827]">Organic Combed Cotton Twill</h4>
                      <p className="text-[13px] text-[#6B7280] mt-0.5">Shivam Textile Mills • Surat, Gujarat</p>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 bg-emerald-50 text-[#16A34A] text-xs font-medium rounded-md border border-emerald-200">
                      Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#EEF2F7] text-center text-xs">
                    <div className="p-2 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB]">
                      <p className="text-[12px] text-[#6B7280]">Price / m</p>
                      <p className="text-sm font-semibold text-[#111827] mt-0.5">₹185.00</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB]">
                      <p className="text-[12px] text-[#6B7280]">Min Order</p>
                      <p className="text-sm font-semibold text-[#111827] mt-0.5">500 m</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB]">
                      <p className="text-[12px] text-[#6B7280]">Stock</p>
                      <p className="text-sm font-semibold text-[#16A34A] mt-0.5">12,500 m</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[#6B7280] text-[13px] flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-[#6B7280]" />
                      Tiered bulk pricing available
                    </span>
                    <Link
                      to="/products"
                      className="text-[#2563EB] hover:text-[#1D4ED8] font-medium flex items-center gap-1 text-xs transition-colors"
                    >
                      View Catalog
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Activity Item */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] text-[#2563EB] flex items-center justify-center shrink-0">
                      <Box size={16} />
                    </div>
                    <div>
                      <p className="text-[#111827] font-medium text-xs">5,000m Linen Order Dispatched</p>
                      <p className="text-[12px] text-[#6B7280]">Garment Exporters Ltd, Mumbai</p>
                    </div>
                  </div>
                  <span className="text-[12px] text-[#6B7280]">2m ago</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Statistics Section (Stripe Style) ─────────────────────────── */}
      <section className="py-12 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label, subtext }) => (
              <div
                key={label}
                className="p-6 rounded-2xl bg-white border border-[#E5E7EB] text-left shadow-sm"
              >
                <p className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111827]">
                  {value}
                </p>
                <p className="text-sm font-medium text-[#111827] mt-2">
                  {label}
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  {subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Category Grid Section ────────────────────────────────────────── */}
      <section className="py-16 bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                Wholesale Catalog
              </span>
              <h2 className="text-2xl sm:text-[36px] font-semibold tracking-tight text-[#111827] mt-1">
                Explore Fabrics by Category
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              Browse All Listings
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map(({ name, icon: Icon, description, count }) => (
              <Link
                key={name}
                to="/products"
                className="group block p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-gray-300 shadow-sm transition-all duration-150 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAFBFC] text-[#2563EB] flex items-center justify-center border border-[#E5E7EB]">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-medium text-[#6B7280] bg-[#FAFBFC] px-2.5 py-1 rounded-full border border-[#E5E7EB]">
                    {count}
                  </span>
                </div>

                <div>
                  <h3 className="text-[22px] font-semibold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                    {name} Fabrics
                  </h3>
                  <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EEF2F7] flex items-center justify-between text-xs font-medium text-[#374151]">
                  <span>Source {name}</span>
                  <ChevronRight size={16} className="text-[#6B7280] group-hover:text-[#2563EB] transition-colors" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. How It Works Section ────────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              Procurement Workflow
            </span>
            <h2 className="text-2xl sm:text-[36px] font-semibold tracking-tight text-[#111827]">
              How TextileHub Works
            </h2>
            <p className="text-base text-[#6B7280]">
              Direct mill-to-buyer trade infrastructure with transparent pricing and escrow safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#111827] text-white flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <span className="text-2xl font-semibold text-[#6B7280]">
                    {step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-[22px] font-semibold text-[#111827]">
                    {title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. CTA Conversion Section ────────────────────────────────────────── */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="text-3xl sm:text-[36px] font-semibold tracking-tight text-[#111827]">
            Ready to Streamline Fabric Sourcing?
          </h2>

          <p className="text-base text-[#6B7280] max-w-lg mx-auto">
            Join thousands of verified garment manufacturers, apparel brands, and textile mills trading directly on India's B2B marketplace.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/register?role=buyer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors shadow-sm"
            >
              Start Sourcing
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/register?role=supplier"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-white hover:bg-gray-50 text-[#111827] border border-[#E5E7EB] transition-colors shadow-sm"
            >
              Register Mill
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
