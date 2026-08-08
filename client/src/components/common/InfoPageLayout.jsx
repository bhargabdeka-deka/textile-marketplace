/**
 * src/components/common/InfoPageLayout.jsx
 *
 * Traditional Indian Textile Layout Engine for Corporate, Guide, and Policy Pages.
 * Inspired by Fabcurate's organic heritage color palette & loom emblem.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

function InfoPageLayout({
  title,
  subtitle,
  badge = 'Verified Mill Directory',
  icon: Icon,
  metrics = [],
  sections = [],
  customContent = null,
  ctaText = 'Explore Wholesale Directory',
  ctaLink = '/products',
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-6 lg:px-8 font-sans text-[#44403C]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Back navigation link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#57534E] hover:text-[#1C1917] transition-colors bg-white px-3.5 py-2 rounded-xl border border-[#E7E2D7] shadow-xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-[#78716C]">
            <ShieldCheck size={15} className="text-[#7B8B30]" />
            <span>Official TextileHub Resource</span>
          </div>
        </div>

        {/* Hero Card Container */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white p-8 sm:p-12 shadow-xs">
          {/* Ambient Warm Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#7B8B30]/10 via-amber-50/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="relative z-10 space-y-5">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {Icon && (
                <div className="w-11 h-11 rounded-xl bg-[#7B8B30]/10 border border-[#7B8B30]/20 flex items-center justify-center text-[#7B8B30] shadow-xs">
                  <Icon size={22} strokeWidth={2} />
                </div>
              )}
              {badge && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[#1C1917] text-[#FAF8F5] shadow-xs">
                  <Sparkles size={13} className="text-[#8C6D35]" />
                  {badge}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] font-serif-display leading-[1.15]">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-[#78716C] font-normal leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Metrics Bar (Optional) */}
            {metrics.length > 0 && (
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#E7E2D7]">
                {metrics.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-2xl font-bold text-[#7B8B30] tracking-tight font-serif-display">{m.value}</p>
                    <p className="text-xs font-semibold text-[#78716C] uppercase tracking-wider">{m.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Custom Rich Content Slot */}
        {customContent}

        {/* Standard Informative Grid */}
        {sections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[#E7E2D7] bg-white shadow-xs hover:shadow-md hover:border-[#7B8B30] transition-all duration-200"
              >
                {sec.icon && (
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] flex items-center justify-center text-[#7B8B30] mb-4 border border-[#E7E2D7]">
                    <sec.icon size={20} />
                  </div>
                )}
                <h3 className="text-base font-bold text-[#1C1917] mb-2 flex items-center gap-2 font-serif-display">
                  <CheckCircle2 size={16} className="text-[#7B8B30] shrink-0" />
                  <span>{sec.title}</span>
                </h3>
                <p className="text-xs text-[#78716C] leading-relaxed font-normal">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="p-8 rounded-2xl border border-[#E7E2D7] bg-white shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-[#1C1917] text-lg font-serif-display">
              Ready to source verified B2B textiles?
            </h4>
            <p className="text-xs text-[#78716C] font-medium">
              Browse 50,000+ fabric listings directly from Surat, Tirupur, and Ahmedabad mills.
            </p>
          </div>
          <Link
            to={ctaLink}
            className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#7B8B30] hover:bg-[#6B7A28] text-white transition-colors shadow-xs shrink-0 flex items-center gap-2"
          >
            <Sparkles size={14} />
            <span>{ctaText}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default InfoPageLayout;
