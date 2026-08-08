/**
 * src/pages/common/HomePage.jsx
 *
 * B2B Textile Marketplace Landing Page — Fabcurate & Shopify Inspired Enterprise UI.
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
  ChevronRight,
  Sparkles,
  Award,
  RefreshCw,
  Star,
  Check
} from 'lucide-react';

// ── Platform Statistics ───────────────────────────────────────────────────────
const STATS = [
  { value: '2,500+', label: 'Verified Textile Mills', subtext: 'Audited & compliance checked' },
  { value: '50,000+', label: 'Fabric Listings', subtext: 'GSM & weave specs verified' },
  { value: '18,000+', label: 'Active B2B Buyers', subtext: 'Garment brands & exporters' },
  { value: '₹500Cr+', label: 'GMV Sourced', subtext: 'Secured via escrow protocol' },
];

// ── Visual Craft & Category Navigation (Fabcurate Style) ──────────────────────
const QUICK_CATEGORIES = [
  { name: 'Cotton & Twill', tag: '200+ GSM', img: '/images/cotton_fabric.png', count: '14,200+ Fabrics' },
  { name: 'Silk & Satin', tag: 'Pure Sheen', img: '/images/silk_satin.png', count: '6,800+ Fabrics' },
  { name: 'Pure Linen 60 Lea', tag: '100% Flax', img: '/images/linen_fabric.png', count: '8,400+ Fabrics' },
  { name: 'Ajrakh Craft', tag: 'Handblock', img: '/images/printed_craft.png', count: '5,100+ Fabrics' },
];

// ── Featured Craft Spotlight Collections ──────────────────────────────────────
const FEATURED_SPOTLIGHTS = [
  {
    id: 1,
    title: 'Organic Combed Cotton Twill',
    mill: 'Shivam Textile Mills • Surat',
    gsm: '240 GSM',
    price: '₹185',
    moq: '500 meters',
    stock: '12,500m',
    badge: 'Verified Mill',
    image: '/images/cotton_fabric.png',
  },
  {
    id: 2,
    title: 'Royal Blue Pure Silk Satin',
    mill: 'Varanasi Weavers Corp • Banaras',
    gsm: '160 GSM',
    price: '₹340',
    moq: '200 meters',
    stock: '4,800m',
    badge: 'Best Seller',
    image: '/images/silk_satin.png',
  },
  {
    id: 3,
    title: 'Pure Flax Linen 60 Lea',
    mill: 'Bhagalpur Linen Crafts • Bihar',
    gsm: '190 GSM',
    price: '₹420',
    moq: '300 meters',
    stock: '8,100m',
    badge: 'Premium Grade',
    image: '/images/linen_fabric.png',
  },
  {
    id: 4,
    title: 'Traditional Ajrakh Block Print',
    mill: 'Kutch Heritage Artisans • Gujarat',
    gsm: '140 GSM',
    price: '₹260',
    moq: '150 meters',
    stock: '3,200m',
    badge: 'Artisan Craft',
    image: '/images/printed_craft.png',
  },
];

// ── Trust & Assurance Pillars ─────────────────────────────────────────────────
const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: '100% Mill Audited',
    desc: 'Every fabric listing is verified for GSM accuracy, yarn composition, and color fastness.',
  },
  {
    icon: Truck,
    title: 'Pan-India Freight',
    desc: 'Direct dispatch from Surat, Ahmedabad, and Coimbatore to all garment clusters.',
  },
  {
    icon: Lock,
    title: 'Milestone Escrow',
    desc: 'Payment released to mills only after physical delivery and buyer spec confirmation.',
  },
  {
    icon: RefreshCw,
    title: '7-Day Swatch Guarantee',
    desc: 'Order physical sample booklets delivered to your doorstep within 24 hours.',
  },
];

// ── How It Works ──────────────────────────────────────────────────────────────
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
    desc: 'Filter by GSM, weave type, MOQ, and pricing. Request physical swatch sample booklets.',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Direct Wholesale Sourcing',
    desc: 'Place bulk purchase orders directly with verified mills backed by milestone escrow protection.',
  },
];

// ── Buyer Testimonials (Social Proof) ─────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "TextileHub transformed our garment export operations. Sourcing 20,000 meters of lab-verified cotton twill directly from Surat mills saved us 22% in procurement costs.",
    name: "Rajesh Singhania",
    role: "Procurement Head, Apex Apparel Exports",
    city: "Mumbai",
  },
  {
    quote: "Finding authentic Ajrakh handblock prints with reliable bulk MOQs used to be impossible. The spec verification and sample booklets give us total peace of mind.",
    name: "Ananya Mehta",
    role: "Founder & Creative Director, Indigo Studio",
    city: "New Delhi",
  },
];

function HomePage() {
  return (
    <div className="bg-[#FAFBFC] min-h-screen text-[#374151] font-sans antialiased">
      {/* ── 0. Top Announcement Bar (Fabcurate Inspired) ─────────────────────── */}
      <div className="bg-[#111827] text-white text-xs py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-gray-200">
              India's Most Trusted B2B Fabric Directory • 5 Lakh+ Meters Shipped
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-gray-300 font-medium text-[12px]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-[#2563EB]" /> 100% Quality Audited</span>
            <span className="flex items-center gap-1.5"><Truck size={13} className="text-[#2563EB]" /> Express Freight</span>
            <span className="flex items-center gap-1.5"><Award size={13} className="text-[#2563EB]" /> Direct Mill Pricing</span>
          </div>
        </div>
      </div>

      {/* ── 1. Hero Section (Enterprise B2B SaaS Layout) ────────────────────── */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Main Headline & Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#FAFBFC] text-[#111827] border border-[#E5E7EB] shadow-xs">
                <Sparkles size={14} className="text-[#2563EB]" />
                <span>Verified Mill-to-Buyer Wholesale Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-[54px] sm:leading-[1.1] font-semibold tracking-tight text-[#111827]">
                Direct Wholesale Fabric Sourcing <br />
                <span className="text-[#2563EB]">From Audited Textile Mills</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base text-[#6B7280] font-normal leading-relaxed max-w-xl">
                Source 50,000+ verified fabric listings directly from Surat, Ahmedabad, and Coimbatore mills. Transparent B2B factory pricing, verified GSM specs, custom MOQs, and escrow payment protection.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors shadow-sm"
                >
                  Explore Wholesale Directory
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/register?role=supplier"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-white hover:bg-gray-50 text-[#111827] border border-[#E5E7EB] transition-colors shadow-sm"
                >
                  <Building2 size={16} className="text-[#6B7280]" />
                  Register as Textile Mill
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-[#EEF2F7] grid grid-cols-2 sm:grid-cols-4 gap-3 text-[#6B7280] text-xs font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#16A34A] shrink-0" />
                  <span>Verified Mill Specs</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#2563EB] shrink-0" />
                  <span>Lab GSM Audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-[#2563EB] shrink-0" />
                  <span>Escrow Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-[#2563EB] shrink-0" />
                  <span>Pan-India Dispatch</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase (Real Fabric Imagery) */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl bg-[#FAFBFC] border border-[#E5E7EB] p-4 shadow-sm space-y-4">
                
                {/* Hero Main Image Banner */}
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-[#E5E7EB] shadow-xs group">
                  <img
                    src="/images/cotton_fabric.png"
                    alt="Luxury Cotton Fabric"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white w-fit mb-1">
                      Featured Mill Listing
                    </span>
                    <h3 className="text-lg font-semibold">Organic Combed Cotton Twill</h3>
                    <p className="text-xs text-gray-200">240 GSM • Shivam Mills, Surat</p>
                  </div>
                </div>

                {/* Sub Showcase Items */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { title: 'Silk Satin', img: '/images/silk_satin.png', price: '₹340/m' },
                    { title: 'Pure Linen', img: '/images/linen_fabric.png', price: '₹420/m' },
                    { title: 'Ajrakh Craft', img: '/images/printed_craft.png', price: '₹260/m' },
                  ].map((item) => (
                    <Link
                      key={item.title}
                      to="/products"
                      className="group block rounded-lg border border-[#E5E7EB] overflow-hidden bg-white p-1.5 hover:border-[#2563EB] transition-all"
                    >
                      <div className="h-16 rounded-md overflow-hidden bg-gray-100">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="mt-1 text-center">
                        <p className="text-[11px] font-medium text-[#111827] truncate">{item.title}</p>
                        <p className="text-[10px] font-semibold text-[#2563EB]">{item.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Quick Category Visual Chips (Fabcurate Layout) ────────────────── */}
      <section className="py-8 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#111827] flex items-center gap-2">
              <Layers size={18} className="text-[#2563EB]" />
              Popular Wholesale Crafts & Weaves
            </h2>
            <Link to="/products" className="text-xs font-medium text-[#2563EB] hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to="/products"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] hover:border-[#2563EB] hover:bg-white transition-all shadow-xs group"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#E5E7EB]">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#111827] group-hover:text-[#2563EB] transition-colors">{cat.name}</h4>
                  <p className="text-[11px] text-[#6B7280]">{cat.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Platform Statistics ────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label, subtext }) => (
              <div
                key={label}
                className="p-6 rounded-2xl bg-[#FAFBFC] border border-[#E5E7EB] text-left shadow-xs"
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

      {/* ── 4. Featured Craft Spotlight Grid ─────────────────────────────────── */}
      <section className="py-16 bg-[#FAFBFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                Mill Direct Spotlight
              </span>
              <h2 className="text-2xl sm:text-[34px] font-semibold tracking-tight text-[#111827] mt-1">
                Trending Wholesale Fabrics
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              Browse All 50,000+ Listings
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_SPOTLIGHTS.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-white border border-[#E5E7EB] hover:border-gray-300 shadow-xs transition-all duration-150 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden bg-gray-100 border-b border-[#E5E7EB]">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/90 backdrop-blur-xs text-[#111827] border border-[#E5E7EB] shadow-xs">
                      {item.badge}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 text-white text-[11px] font-medium">
                      {item.gsm}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-base text-[#111827] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6B7280]">{item.mill}</p>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="p-2 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB]">
                        <span className="text-[#6B7280] text-[11px] block">Price / meter</span>
                        <span className="font-semibold text-[#111827] text-sm">{item.price}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#FAFBFC] border border-[#E5E7EB]">
                        <span className="text-[#6B7280] text-[11px] block">Min Order</span>
                        <span className="font-medium text-[#111827] text-xs">{item.moq}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 pt-0">
                  <Link
                    to="/products"
                    className="w-full py-2 rounded-xl text-xs font-medium bg-[#FAFBFC] hover:bg-[#2563EB] hover:text-white text-[#111827] border border-[#E5E7EB] hover:border-transparent transition-all flex items-center justify-center gap-1.5"
                  >
                    View Specs & Request Swatch
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. Why Top Garment Brands Choose TextileHub (Trust Pillars) ─────── */}
      <section className="py-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              Quality Infrastructure
            </span>
            <h2 className="text-2xl sm:text-[34px] font-semibold tracking-tight text-[#111827]">
              Why Garment Brands Trust TextileHub
            </h2>
            <p className="text-sm text-[#6B7280]">
              Built for high-volume apparel manufacturers, fashion labels, and textile exporters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-[#FAFBFC] border border-[#E5E7EB] shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] text-[#2563EB] flex items-center justify-center shadow-xs">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-base text-[#111827]">{title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. Verified Buyer Reviews (Social Proof Grid) ───────────────────── */}
      <section className="py-16 bg-[#FAFBFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-lg mx-auto mb-10 space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              Client Testimonials
            </span>
            <h2 className="text-2xl sm:text-[32px] font-semibold text-[#111827]">
              Trusted by 18,000+ Procurement Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-[#374151] leading-relaxed italic font-normal">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-[#EEF2F7] flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-[#111827]">{t.name}</h4>
                    <p className="text-[#6B7280] text-[11px]">{t.role} • {t.city}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-full text-[11px]">
                    <Check size={12} /> Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. How It Works Workflow ────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              Procurement Workflow
            </span>
            <h2 className="text-2xl sm:text-[34px] font-semibold tracking-tight text-[#111827]">
              How TextileHub Works
            </h2>
            <p className="text-sm text-[#6B7280]">
              Direct mill-to-buyer trade infrastructure with transparent pricing and escrow safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#111827] text-white flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <span className="text-2xl font-semibold text-[#6B7280]">
                    {step}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-semibold text-[#111827]">
                    {title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 8. CTA Conversion Section ────────────────────────────────────────── */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="text-3xl sm:text-[36px] font-semibold tracking-tight text-[#111827]">
            Ready to Streamline Fabric Sourcing?
          </h2>

          <p className="text-sm text-[#6B7280] max-w-lg mx-auto">
            Join thousands of verified garment manufacturers, apparel brands, and textile mills trading directly on India's premier B2B marketplace.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
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
