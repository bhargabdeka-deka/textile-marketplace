/**
 * src/components/common/Footer.jsx
 *
 * Site-wide footer with brand info, navigation columns, and legal links.
 * SaaS Premium Styling.
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
    <footer className="mt-auto bg-black text-white border-t border-[#333]">
      {/* ── Main Footer Content ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white text-black transition-transform group-hover:scale-105">
                <Package size={22} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Textile<span className="text-[var(--color-brand-secondary)]">Hub</span>
              </span>
            </Link>

            <p className="text-sm font-medium leading-relaxed mb-8 max-w-sm text-[#a1a1aa]">
              The premier B2B marketplace connecting textile buyers and suppliers across India and beyond. Built for modern trade.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 text-sm font-medium text-[#a1a1aa]">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#666]" />
                <span className="hover:text-white transition-colors cursor-pointer">hello@textilehub.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#666]" />
                <span className="hover:text-white transition-colors cursor-pointer">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[#666]" />
                <span className="hover:text-white transition-colors cursor-pointer">Surat, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold text-sm mb-6 tracking-wide">
                {title}
              </h3>
              <ul className="space-y-4">
                {links.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm font-medium text-[#a1a1aa] transition-colors hover:text-white"
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

      {/* ── Bottom Bar ──────────────────────────────────────────────── */}
      <div className="border-t border-[#333] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-[#666]">
            © {year} TextileHub. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium text-[#666]">
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
