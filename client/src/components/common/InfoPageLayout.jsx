/**
 * src/components/common/InfoPageLayout.jsx
 *
 * Generic layout template for info, guide, policy, and company pages.
 * Displays a premium SaaS hero, icon badge, description, coming soon badge,
 * and informative section cards.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';

function InfoPageLayout({
  title,
  subtitle,
  badge = 'Coming Soon',
  icon: Icon,
  sections = [],
  ctaText = 'Explore Marketplace',
  ctaLink = '/products',
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back navigation link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 shadow-sm">
          {/* Subtle grid backdrop overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-3">
              {Icon && (
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                  <Icon size={24} />
                </div>
              )}
              {badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                  <Clock size={14} />
                  {badge}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
                {title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>

          </div>
        </div>

        {/* Informative Sections Grid */}
        {sections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {sec.icon && (
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700 mb-4 border border-gray-100">
                    <sec.icon size={22} />
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {sec.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA Footer Card */}
        <div className="p-8 rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-bold text-gray-900 text-lg">
              Looking for raw fabrics or textile suppliers?
            </h4>
            <p className="text-sm text-gray-500 font-medium">
              Explore thousands of certified listings directly on TextileHub marketplace.
            </p>
          </div>
          <Link
            to={ctaLink}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm shrink-0 flex items-center gap-2"
          >
            <Sparkles size={16} />
            {ctaText}
          </Link>
        </div>

      </div>
    </div>
  );
}

export default InfoPageLayout;
