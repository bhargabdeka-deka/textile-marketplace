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
    <div className="min-h-screen bg-[var(--color-bg)] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back navigation link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-b from-neutral-900 to-black p-8 sm:p-12 text-white shadow-xl">
          {/* Subtle grid backdrop overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-3">
              {Icon && (
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                  <Icon size={24} />
                </div>
              )}
              {badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
                  <Clock size={12} />
                  {badge}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {title}
              </h1>
              <p className="text-lg sm:text-xl text-neutral-400 font-medium leading-relaxed max-w-2xl">
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
                className="p-6 rounded-2xl border border-[var(--color-border)] bg-white dark:bg-neutral-900/50 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {sec.icon && (
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200 mb-4">
                    <sec.icon size={20} />
                  </div>
                )}
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">
                  {sec.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA Footer Card */}
        <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-gradient-to-r from-neutral-100 to-white dark:from-neutral-950 dark:to-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-[var(--color-text)]">
              Looking for raw fabrics or textile suppliers?
            </h4>
            <p className="text-xs text-[var(--color-muted)]">
              Explore thousands of certified listings directly on TextileHub marketplace.
            </p>
          </div>
          <Link
            to={ctaLink}
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors shadow-sm shrink-0 flex items-center gap-2"
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
