import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Building2, Globe, ShieldCheck, Zap, Award, Users, Truck, CheckCircle2 } from 'lucide-react';

function AboutPage() {
  const customContent = (
    <div className="space-y-8">
      {/* 1. Regional Weaving Hubs Showcase */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-6">
        <div className="border-b border-[#EEF2F7] pb-4">
          <h2 className="text-xl font-bold text-[#111827]">India's Regional Textile Hubs</h2>
          <p className="text-sm text-[#6B7280]">Connecting verified mills directly with global apparel houses</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { city: 'Surat, Gujarat', type: 'Synthetic & Silk Jacquards', mills: '450+ Mills' },
            { city: 'Ahmedabad, Gujarat', type: 'Combed Cotton & Denim', mills: '320+ Mills' },
            { city: 'Tirupur, Tamil Nadu', type: 'Knitwear & Organic Jersey', mills: '280+ Mills' },
            { city: 'Panipat, Haryana', type: 'Linen & Home Textiles', mills: '180+ Mills' },
          ].map((hub, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] space-y-1.5">
              <span className="text-xs font-semibold text-[#2563EB]">{hub.mills}</span>
              <h3 className="font-bold text-[#111827] text-sm">{hub.city}</h3>
              <p className="text-xs text-[#6B7280] font-medium">{hub.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Core Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <Award size={20} />
          </div>
          <h3 className="font-bold text-[#111827] text-base">Direct Mill Pricing</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed font-normal">
            Eliminate broker commissions and buy raw fabrics directly at factory gate rates with transparent price-per-meter breakdowns.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-bold text-[#111827] text-base">100% Quality Audited</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed font-normal">
            Every fabric batch undergoes GSM audit, yarn count verification, and shrinkage testing prior to freight dispatch.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Truck size={20} />
          </div>
          <h3 className="font-bold text-[#111827] text-base">Pan-India Freight Logistics</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed font-normal">
            Partnered with top freight carriers to deliver full-roll shipments and sample swatches within 48-72 hours.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="About TextileHub"
      subtitle="Pioneering India's digital B2B textile trade infrastructure. Connecting verified mills, weavers, and fabric manufacturers directly with global apparel exporters."
      badge="Our Story & Vision"
      icon={Building2}
      metrics={[
        { value: '5 Lakh+', label: 'Meters Shipped' },
        { value: '1,200+', label: 'Audited Mills' },
        { value: '450+', label: 'Apparel Brands' },
        { value: '99.4%', label: 'Order Accuracy' },
      ]}
      customContent={customContent}
      sections={[
        {
          title: 'Direct Manufacturer Access',
          content: 'Bypass traditional trading layers and source fabrics directly from Surat, Tirupur, and Ahmedabad mills with guaranteed GST invoices.',
          icon: Globe,
        },
        {
          title: 'AI Fabric Discovery',
          content: 'Search 50,000+ SKUs by GSM count, weave density, yarn type, and material composition using our natural language AI search engine.',
          icon: Zap,
        },
      ]}
    />
  );
}

export default AboutPage;
