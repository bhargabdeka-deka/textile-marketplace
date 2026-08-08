import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { ShoppingBag, Search, CheckCircle2, CreditCard, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    step: '01',
    title: 'Search & Filter Fabrics',
    desc: 'Use natural language AI search or filter 50,000+ listings by GSM count (120-400 GSM), weave type (Twill, Satin, Plain, Jacquard), and yarn composition.',
  },
  {
    step: '02',
    title: 'Order Physical Sample Swatches',
    desc: 'Request 1-5m swatch samples to evaluate hand feel, dye fastness, and drape before committing to a factory-scale bulk order.',
  },
  {
    step: '03',
    title: 'Verify Mill Credentials & MOQs',
    desc: 'Check GST-audited mill profiles, factory location badges (Surat, Ahmedabad, Tirupur), and minimum order quantity thresholds.',
  },
  {
    step: '04',
    title: 'Secure B2B Escrow Checkout',
    desc: 'Place orders with 100% payment escrow protection. Funds are safely held until you confirm delivery quality.',
  },
  {
    step: '05',
    title: 'Track Freight & Receive GST Invoices',
    desc: 'Receive real-time shipment updates with tax-compliant GST e-Invoices for corporate tax input credit claims.',
  },
];

function BuyerGuidePage() {
  const customContent = (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-6">
      <div className="border-b border-[#EEF2F7] pb-4">
        <h2 className="text-xl font-bold text-[#111827]">5-Step Procurement Workflow for Apparel Brands</h2>
        <p className="text-xs text-[#6B7280]">How to source wholesale fabric with zero middleman markup</p>
      </div>

      <div className="space-y-4">
        {STEPS.map((s, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] flex items-start gap-4">
            <span className="w-10 h-10 rounded-xl bg-[#111827] text-white flex items-center justify-center font-bold text-sm shrink-0">
              {s.step}
            </span>
            <div className="space-y-1">
              <h3 className="font-bold text-[#111827] text-sm flex items-center gap-2">
                <span>{s.title}</span>
                <CheckCircle2 size={15} className="text-[#2563EB]" />
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed font-normal">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="Buyer's Sourcing Guide"
      subtitle="Complete handbook for garment manufacturers, fashion studios, and apparel exporters on evaluating fabric specs and mill orders."
      badge="Buyer Handbook"
      icon={ShoppingBag}
      metrics={[
        { value: '5 Steps', label: 'Simple Sourcing' },
        { value: '100%', label: 'Escrow Protection' },
        { value: '48 Hours', label: 'Sample Dispatch' },
      ]}
      customContent={customContent}
    />
  );
}

export default BuyerGuidePage;
