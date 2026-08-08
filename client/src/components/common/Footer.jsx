/**
 * src/components/common/Footer.jsx
 *
 * Traditional Indian Textile Aesthetic Footer — Fabcurate Inspired.
 */

import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const FOOTER_LINKS = {
  Marketplace: [
    { label: 'Browse Fabrics',   to: '/products' },
    { label: 'Suppliers Directory', to: '/suppliers' },
    { label: 'Weave Categories', to: '/categories' },
    { label: 'Bulk Orders',      to: '/bulk-orders' },
  ],
  Company: [
    { label: 'Our Story',   to: '/about' },
    { label: 'Craft Blog',  to: '/blog' },
    { label: 'Careers',     to: '/careers' },
    { label: 'Contact Us',  to: '/contact' },
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
    <footer className="mt-auto bg-[#FAF8F5] text-[#1C1917] border-t border-[#E7E2D7]">
      {/* ── Main Footer Section ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* ── Brand Column ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />

            <p className="text-xs leading-relaxed max-w-sm text-[#78716C] font-normal">
              Pioneering India's digital B2B textile trade infrastructure. Connecting verified mills in Surat, Tirupur, Ahmedabad, and Panipat directly with global apparel houses.
            </p>

            {/* Contact Details */}
            <div className="pt-2 space-y-2.5 text-xs text-[#78716C]">
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#7B8B30] shrink-0" />
                <span className="hover:text-[#7B8B30] transition-colors cursor-pointer font-medium">hello@textilehub.in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#7B8B30] shrink-0" />
                <span className="hover:text-[#7B8B30] transition-colors cursor-pointer font-medium">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[#7B8B30] shrink-0" />
                <span className="hover:text-[#7B8B30] transition-colors cursor-pointer font-medium">Surat, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* ── Link Columns ─────────────────────────────────────────── */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C6D35]">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-xs text-[#57534E] transition-colors duration-150 hover:text-[#7B8B30] font-medium inline-block py-0.5"
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
      <div className="border-t border-[#E7E2D7] bg-[#F3EFE6] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C] font-medium">
          <p>© {year} TextileHub Technologies. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/privacy" className="hover:text-[#7B8B30] transition-colors">Privacy Policy</Link>
            <Link to="/terms"   className="hover:text-[#7B8B30] transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-[#7B8B30] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
