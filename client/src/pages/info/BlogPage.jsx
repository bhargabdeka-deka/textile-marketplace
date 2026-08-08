import React, { useState } from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Newspaper, TrendingUp, BookOpen, Sparkles, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Indian Cotton Price Index Q3 2026: Trends in 60s & 80s Combed Yarns',
    summary: 'An in-depth analysis of raw cotton spot rates across Gujarat and Punjab hubs, impact of monsoon yields, and projected mill pricing for export garments.',
    category: 'Market Intelligence',
    readTime: '6 min read',
    author: 'Vikram Mehta (Senior Textile Analyst)',
    date: 'August 5, 2026',
    image: '/images/cotton_fabric.png',
  },
  {
    id: 2,
    title: 'Understanding GSM, Yarn Count & Shrinkage Tolerances for Garment Exporters',
    summary: 'A practical technical guide for apparel buyers on evaluating fabric density, weave tension, and color fastness before finalizing bulk purchase orders.',
    category: 'Sourcing Guide',
    readTime: '8 min read',
    author: 'Ananya Sharma (Fabric Quality Specialist)',
    date: 'July 28, 2026',
    image: '/images/silk_satin.png',
  },
  {
    id: 3,
    title: 'Sustainable Weaving: Organic Linen & Eco-Friendly Dyeing Innovations in 2026',
    summary: 'How Tirupur and Coimbatore weaving mills are adopting zero-liquid discharge (ZLD) dyeing techniques to meet European GOTS certification standards.',
    category: 'Sustainability',
    readTime: '5 min read',
    author: 'Rohan Deshmukh (Supply Chain Lead)',
    date: 'July 15, 2026',
    image: '/images/linen_fabric.png',
  },
  {
    id: 4,
    title: 'Traditional Craft Revival: Scaling Ajrakh & Handblock Printing for B2B Export',
    summary: 'Connecting Kutch artisan clusters directly with international fashion houses while maintaining authentic natural dye formulas and fair-trade standards.',
    category: 'Craft & Weaves',
    readTime: '7 min read',
    author: 'Priya Iyer (Craft Heritage Curator)',
    date: 'June 30, 2026',
    image: '/images/printed_craft.png',
  },
];

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Market Intelligence', 'Sourcing Guide', 'Sustainability', 'Craft & Weaves'];

  const filteredPosts = selectedCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  const customContent = (
    <div className="space-y-8">
      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#E5E7EB]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-white text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-[#FAFBFC]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-semibold bg-[#111827]/90 text-white backdrop-blur-xs">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>

              <h2 className="text-lg font-bold text-[#111827] leading-snug group-hover:text-[#2563EB] transition-colors">
                {post.title}
              </h2>

              <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3 font-normal">
                {post.summary}
              </p>

              <div className="mt-auto pt-4 border-t border-[#EEF2F7] flex items-center justify-between">
                <span className="text-xs font-medium text-[#374151] flex items-center gap-1">
                  <User size={13} className="text-[#2563EB]" /> {post.author}
                </span>
                <span className="text-xs font-semibold text-[#2563EB] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="TextileHub Insights & Industry Publication"
      subtitle="Expert market intelligence, yarn rate indices, fabric technical guides, and export compliance strategies for B2B buyers."
      badge="Industry Intelligence"
      icon={Newspaper}
      metrics={[
        { value: '45,000+', label: 'Monthly Readers' },
        { value: 'Weekly', label: 'Cotton Rate Report' },
        { value: '100%', label: 'Industry Verified Specs' },
      ]}
      customContent={customContent}
    />
  );
}

export default BlogPage;
