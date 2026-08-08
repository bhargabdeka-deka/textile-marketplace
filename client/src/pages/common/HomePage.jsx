/**
 * src/pages/common/HomePage.jsx
 *
 * Traditional Indian B2B Textile Marketplace Landing Page — Fabcurate Inspired.
 */

import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck,
  Building2,
  Search,
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
  { value: '2,500+', label: 'Verified Textile Mills', subtext: 'Surat, Ahmedabad & Tirupur' },
  { value: '50,000+', label: 'Fabric SKUs Listed', subtext: 'GSM & yarn specs verified' },
  { value: '18,000+', label: 'Active B2B Buyers', subtext: 'Garment houses & exporters' },
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
    icon: Search,
    title: 'Discover & Inspect Weaves',
    desc: 'Filter by GSM, weave type, MOQ, and pricing. Request physical swatch sample booklets.',
  },
  {
    step: '02',
    icon: ShieldCheck,
    title: 'Direct Wholesale Sourcing',
    desc: 'Place bulk purchase orders directly with verified mills backed by milestone escrow protection.',
  },
  {
    step: '03',
    icon: Truck,
    title: 'Doorstep Freight & GST Invoice',
    desc: 'Receive real-time shipment updates with tax-compliant GST e-Invoices for your business.',
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
    <div className="bg-[#FAF8F5] min-h-screen text-[#44403C] font-sans antialiased">
      {/* ── 0. Top Announcement Bar (Fabcurate Inspired) ─────────────────────── */}
      <div className="bg-[#1C1917] text-white text-xs py-2.5 px-4 border-b border-[#292524]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="font-semibold tracking-wide text-[#E7E2D7]">
              India's Most Trusted B2B Textile Sourcing Directory • 5 Lakh+ Meters Shipped
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[#A8A29E] font-medium text-[12px]">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#7B8B30]" /> 100% Quality Audited</span>
            <span className="flex items-center gap-1.5"><Truck size={14} className="text-[#7B8B30]" /> Express Freight</span>
            <span className="flex items-center gap-1.5"><Award size={14} className="text-[#7B8B30]" /> Direct Mill Pricing</span>
          </div>
        </div>
      </div>

      {/* ── 1. Hero Section (Traditional Indian Textile Heritage) ─────────────── */}
      <section className="bg-[#FAF8F5] border-b border-[#E7E2D7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Main Headline & Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#7B8B30]/10 text-[#7B8B30] border border-[#7B8B30]/20 shadow-xs">
                <Sparkles size={14} className="text-[#8C6D35]" />
                <span className="uppercase tracking-wider">Authentic Indian Wholesale Fabric Directory</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-[52px] sm:leading-[1.15] font-bold tracking-tight text-[#1C1917] font-serif-display">
                Direct Indian Fabric Sourcing <br />
                <span className="text-[#7B8B30]">From Regional Weaving Mills</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base text-[#57534E] font-normal leading-relaxed max-w-xl">
                Source 50,000+ verified fabric listings directly from Surat, Ahmedabad, Tirupur, and Banaras mills. Transparent factory pricing, verified GSM specs, custom MOQs, and escrow payment safety.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#7B8B30] hover:bg-[#6B7A28] text-white transition-colors shadow-xs"
                >
                  Explore Wholesale Directory
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/register?role=supplier"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#F3EFE6] text-[#1C1917] border border-[#E7E2D7] transition-colors shadow-xs"
                >
                  <Building2 size={16} className="text-[#7B8B30]" />
                  Register as Weaving Mill
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-[#E7E2D7] grid grid-cols-2 sm:grid-cols-4 gap-3 text-[#78716C] text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#16A34A] shrink-0" />
                  <span>Verified Mill Specs</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#7B8B30] shrink-0" />
                  <span>Lab GSM Audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-[#7B8B30] shrink-0" />
                  <span>Escrow Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-[#7B8B30] shrink-0" />
                  <span>Pan-India Dispatch</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase (Real Fabric Imagery) */}
            <div className="lg:col-span-5 w-full">
              <div className="relative rounded-2xl bg-white border border-[#E7E2D7] p-4 shadow-sm space-y-4">
                
                {/* Hero Main Image Banner */}
                <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-[#E7E2D7] shadow-xs group">
                  <img
                    src="/images/cotton_fabric.png"
                    alt="Luxury Cotton Fabric"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7B8B30] text-white w-fit mb-1">
                      Featured Mill Listing
                    </span>
                    <h3 className="text-lg font-bold font-serif-display">Organic Combed Cotton Twill</h3>
                    <p className="text-xs text-[#E7E2D7]">240 GSM • Shivam Mills, Surat</p>
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
                      className="group block rounded-lg border border-[#E7E2D7] overflow-hidden bg-[#FAF8F5] p-1.5 hover:border-[#7B8B30] transition-all"
                    >
                      <div className="h-16 rounded-md overflow-hidden bg-white">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="mt-1 text-center">
                        <p className="text-[11px] font-semibold text-[#1C1917] truncate">{item.title}</p>
                        <p className="text-[10px] font-bold text-[#7B8B30]">{item.price}</p>
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
      <section className="py-8 bg-white border-b border-[#E7E2D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#1C1917] font-serif-display flex items-center gap-2">
              <Layers size={18} className="text-[#7B8B30]" />
              Popular Indian Wholesale Crafts & Weaves
            </h2>
            <Link to="/products" className="text-xs font-bold text-[#7B8B30] hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to="/products"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E2D7] hover:border-[#7B8B30] hover:bg-white transition-all shadow-xs group"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#E7E2D7]">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C1917] group-hover:text-[#7B8B30] transition-colors">{cat.name}</h4>
                  <p className="text-[11px] text-[#78716C] font-medium">{cat.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Platform Statistics ────────────────────────────────────────────── */}
      <section className="py-12 bg-[#FAF8F5] border-b border-[#E7E2D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label, subtext }) => (
              <div
                key={label}
                className="p-6 rounded-2xl bg-white border border-[#E7E2D7] text-left shadow-xs space-y-1"
              >
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917] font-serif-display">
                  {value}
                </p>
                <p className="text-xs font-bold text-[#7B8B30] uppercase tracking-wider">
                  {label}
                </p>
                <p className="text-xs text-[#78716C] font-medium">
                  {subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Featured Craft Spotlight Grid ─────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-[#E7E2D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D35]">
                Mill Direct Spotlight
              </span>
              <h2 className="text-2xl sm:text-[34px] font-bold tracking-tight text-[#1C1917] font-serif-display mt-1">
                Trending Wholesale Fabrics
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B8B30] hover:text-[#6B7A28] transition-colors"
            >
              Browse All 50,000+ Listings
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_SPOTLIGHTS.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-[#FAF8F5] border border-[#E7E2D7] hover:border-[#7B8B30] shadow-xs transition-all duration-150 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden bg-white border-b border-[#E7E2D7]">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1C1917] text-white shadow-xs">
                      {item.badge}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-semibold">
                      {item.gsm}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-base text-[#1C1917] font-serif-display group-hover:text-[#7B8B30] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#78716C] font-medium">{item.mill}</p>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="p-2 rounded-lg bg-white border border-[#E7E2D7]">
                        <span className="text-[#78716C] text-[10px] uppercase font-bold block">Price / meter</span>
                        <span className="font-bold text-[#7B8B30] text-sm">{item.price}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#E7E2D7]">
                        <span className="text-[#78716C] text-[10px] uppercase font-bold block">Min Order</span>
                        <span className="font-semibold text-[#1C1917] text-xs">{item.moq}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 pt-0">
                  <Link
                    to="/products"
                    className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#7B8B30] hover:text-white text-[#1C1917] border border-[#E7E2D7] hover:border-transparent transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    View Specs & Swatch
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. Why Top Garment Brands Choose TextileHub (Trust Pillars) ─────── */}
      <section className="py-16 bg-[#FAF8F5] border-b border-[#E7E2D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7B8B30]">
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-[34px] font-bold tracking-tight text-[#1C1917] font-serif-display">
              Why Garment Exporters Trust TextileHub
            </h2>
            <p className="text-sm text-[#78716C]">
              Built for high-volume apparel manufacturers, fashion labels, and textile exporters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-white border border-[#E7E2D7] shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E7E2D7] text-[#7B8B30] flex items-center justify-center shadow-xs">
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-base text-[#1C1917]">{title}</h3>
                <p className="text-xs text-[#78716C] leading-relaxed font-normal">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. Verified Buyer Reviews (Social Proof Grid) ───────────────────── */}
      <section className="py-16 bg-white border-b border-[#E7E2D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-lg mx-auto mb-10 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D35]">
              Client Testimonials
            </span>
            <h2 className="text-2xl sm:text-[32px] font-bold text-[#1C1917] font-serif-display">
              Trusted by 18,000+ Procurement Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D7] shadow-xs space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs text-[#44403C] leading-relaxed italic font-normal">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-[#E7E2D7] flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#1C1917]">{t.name}</h4>
                    <p className="text-[#78716C] text-[11px]">{t.role} • {t.city}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[#16A34A] font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-[10px] border border-emerald-200">
                    <Check size={12} /> Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. CTA Conversion Section ────────────────────────────────────────── */}
      <section className="py-16 bg-[#FAF8F5] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-5">
          <h2 className="text-3xl sm:text-[36px] font-bold tracking-tight text-[#1C1917] font-serif-display">
            Ready to Streamline Fabric Sourcing?
          </h2>

          <p className="text-xs text-[#78716C] max-w-lg mx-auto leading-relaxed">
            Join thousands of verified garment manufacturers, apparel brands, and textile mills trading directly on India's premier B2B marketplace.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#7B8B30] hover:bg-[#6B7A28] text-white transition-colors shadow-xs"
            >
              Start Sourcing
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/register?role=supplier"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#F3EFE6] text-[#1C1917] border border-[#E7E2D7] transition-colors shadow-xs"
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
