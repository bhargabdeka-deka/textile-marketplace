/**
 * src/components/common/InfoPageLayout.jsx
 *
 * Premium B2B SaaS Layout Engine for Corporate, Guide, and Policy Pages.
 * Inspired by Fabcurate, Shopify, and Stripe design systems.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

function InfoPageLayout({
  title,
  subtitle,
  badge = 'Verified Platform',
  icon: Icon,
  metrics = [],
  sections = [],
  customContent = null,
  ctaText = 'Explore Wholesale Directory',
  ctaLink = '/products',
}) {
  return (
    <div className="min-h-screen bg-[#FAFBFC] py-10 px-4 sm:px-6 lg:px-8 font-sans text-[#374151]">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Back navigation link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] transition-colors bg-white px-3 py-1.5 rounded-lg border border-[#E5E7EB] shadow-xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280]">
            <ShieldCheck size={14} className="text-[#2563EB]" />
            <span>Official TextileHub Resource</span>
          </div>
        </div>

        {/* Hero Card Container */}
        <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-8 sm:p-12 shadow-sm">
          {/* Background Gradient Mesh */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50/80 via-indigo-50/30 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="relative z-10 space-y-5">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {Icon && (
                <div className="w-11 h-11 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] shadow-xs">
                  <Icon size={22} strokeWidth={2} />
                </div>
              )}
              {badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-[#111827] text-white shadow-xs">
                  <Sparkles size={13} className="text-amber-400" />
                  {badge}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] leading-[1.15]">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-[#6B7280] font-normal leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Metrics Bar (Optional) */}
            {metrics.length > 0 && (
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#EEF2F7]">
                {metrics.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-2xl font-bold text-[#111827] tracking-tight">{m.value}</p>
                    <p className="text-xs font-medium text-[#6B7280]">{m.label}</p>
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
                className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200"
              >
                {sec.icon && (
                  <div className="w-10 h-10 rounded-xl bg-[#FAFBFC] flex items-center justify-center text-[#111827] mb-4 border border-[#E5E7EB]">
                    <sec.icon size={20} />
                  </div>
                )}
                <h3 className="text-base font-semibold text-[#111827] mb-2 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#2563EB] shrink-0" />
                  <span>{sec.title}</span>
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed font-normal">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="p-8 rounded-2xl border border-[#E5E7EB] bg-white shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-semibold text-[#111827] text-lg">
              Ready to source verified B2B textiles?
            </h4>
            <p className="text-sm text-[#6B7280]">
              Browse 50,000+ fabric listings directly from Surat, Tirupur, and Ahmedabad mills.
            </p>
          </div>
          <Link
            to={ctaLink}
            className="px-6 py-3 rounded-xl text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors shadow-xs shrink-0 flex items-center gap-2"
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
