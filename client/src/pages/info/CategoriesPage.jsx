import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Layers, ArrowRight, Grid, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    name: 'Cotton & Twill',
    count: '14,200+ Listings',
    desc: 'Combed, carded, organic jersey, poplin, and heavy 240 GSM twill weaves for shirts, trousers, and uniforms.',
    image: '/images/cotton_fabric.png',
  },
  {
    name: 'Silk & Satin',
    count: '8,400+ Listings',
    desc: 'Royal silk satin, crepe de chine, mulberry silk, and organza for bridalwear, sarees, and luxury apparel.',
    image: '/images/silk_satin.png',
  },
  {
    name: 'Pure Flax Linen',
    count: '6,100+ Listings',
    desc: '100% European flax 60 Lea linen, linen-cotton blends, and slub textures for resort wear and summer shirts.',
    image: '/images/linen_fabric.png',
  },
  {
    name: 'Craft & Print',
    count: '9,800+ Listings',
    desc: 'Traditional Ajrakh block print, Kalamkari, Dabu, Bandhani, and digital floral prints on natural bases.',
    image: '/images/printed_craft.png',
  },
];

function CategoriesPage() {
  const customContent = (
    <div className="space-y-6">
      <div className="border-b border-[#E5E7EB] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Explore Fabric Weaves & Crafts</h2>
          <p className="text-xs text-[#6B7280]">Select a fabric category to browse direct mill listings</p>
        </div>
        <Link
          to="/products"
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors shadow-xs flex items-center gap-1"
        >
          <span>View All Directory</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((cat, idx) => (
          <Link
            key={idx}
            to={`/products?category=${encodeURIComponent(cat.name)}`}
            className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col"
          >
            <div className="relative aspect-[16/9] bg-[#FAFBFC] overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-semibold bg-[#111827]/90 text-white backdrop-blur-xs">
                {cat.count}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col gap-2">
              <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors flex items-center justify-between">
                <span>{cat.name}</span>
                <ArrowRight size={16} className="text-[#6B7280] group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed font-normal">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="Wholesale Fabric Categories"
      subtitle="Browse India's largest catalog of raw and finished textiles categorized by fiber composition, weave density, and craft heritage."
      badge="Catalog Directory"
      icon={Layers}
      metrics={[
        { value: '50,000+', label: 'Total Fabric SKUs' },
        { value: '4 Major', label: 'Weaving Hubs' },
        { value: '100%', label: 'GSM Verified' },
      ]}
      customContent={customContent}
    />
  );
}

export default CategoriesPage;
