/**
 * src/components/common/Footer.jsx
 *
 * Site-wide footer — Stripe / Shopify Design System.
 */

import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin } from 'lucide-react';

const FOOTER_LINKS = {
  Marketplace: [
    { label: 'Browse Fabrics',   to: '/products' },
    { label: 'Suppliers',        to: '/suppliers' },
    { label: 'Categories',       to: '/categories' },
    { label: 'Bulk Orders',      to: '/bulk-orders' },
  ],
  Company: [
    { label: 'About Us',   to: '/about' },
    { label: 'Blog',       to: '/blog' },
    { label: 'Careers',    to: '/careers' },
    { label: 'Contact',    to: '/contact' },
  ],
  Support: [
    { label: 'Help Center',      to: '/help' },
    { label: 'Buyer Guide',      to: '/buyer-guide' },
    { label: 'Supplier Guide',   to: '/supplier-guide' },
    { label: 'Returns Policy',   to: '/returns' },
  ],
};

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-slate-950 text-slate-100 border-t border-slate-800/80">
      {/* ── Main Footer Section ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* ── Brand Column ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-slate-950 transition-transform duration-200 group-hover:scale-105 shadow-sm">
                <Package size={17} strokeWidth={2.2} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Textile<span className="text-[var(--color-brand-secondary)]">Hub</span>
              </span>
            </Link>

            <p className="text-xs md:text-sm font-medium leading-relaxed max-w-sm text-slate-400">
              The premier B2B marketplace connecting textile buyers and suppliers across India and beyond. Built for modern trade infrastructure.
            </p>

            {/* Contact Details */}
            <div className="pt-2 space-y-2.5 text-xs md:text-sm font-medium text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-slate-500 shrink-0" />
                <span className="hover:text-white transition-colors cursor-pointer">hello@textilehub.in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-slate-500 shrink-0" />
                <span className="hover:text-white transition-colors cursor-pointer">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-slate-500 shrink-0" />
                <span className="hover:text-white transition-colors cursor-pointer">Surat, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* ── Link Columns ─────────────────────────────────────────── */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-xs md:text-sm font-medium text-slate-400 transition-colors duration-150 hover:text-white inline-block py-0.5"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sub-Footer / Legal Bar ───────────────────────────────────── */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-500">
            © {year} TextileHub. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-xs font-medium text-slate-400">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms"   className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
