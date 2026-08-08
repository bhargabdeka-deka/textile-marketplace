import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Store, ShieldCheck, Upload, DollarSign, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SUPPLIER_STEPS = [
  {
    step: '01',
    title: 'Submit GST & Business Verification',
    desc: 'Register your mill or weaving facility with GSTIN and business registration to unlock verified supplier status.',
  },
  {
    step: '02',
    title: 'Upload Fabric Catalog & GSM Specs',
    desc: 'List your fabric inventory with high-res photography, yarn count specs, GSM ratings, price per meter, and minimum order quantities.',
  },
  {
    step: '03',
    title: 'Receive Purchase Orders & RFQs',
    desc: 'Manage incoming buyer purchase orders and bulk custom dye requests directly through your supplier dashboard.',
  },
  {
    step: '04',
    title: 'Dispatch Freight & Upload Waybills',
    desc: 'Package full rolls or swatch samples and generate e-Way bills for doorstep pickup by our logistics partners.',
  },
  {
    step: '05',
    title: 'Receive Direct Bank Settlement',
    desc: 'Automated escrow payout credited directly to your registered bank account upon delivery verification.',
  },
];

function SupplierGuidePage() {
  const customContent = (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-6">
      <div className="border-b border-[#EEF2F7] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Supplier Mill Onboarding Roadmap</h2>
          <p className="text-xs text-[#6B7280]">Expand your market reach across 5,000+ active apparel buyers</p>
        </div>
        <Link
          to="/register?role=supplier"
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors shadow-xs flex items-center gap-1.5"
        >
          <span>Register as Supplier</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {SUPPLIER_STEPS.map((s, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] flex items-start gap-4">
            <span className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shrink-0">
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
      title="Supplier & Mill Onboarding Guide"
      subtitle="How textile manufacturers, weavers, and fabric traders scale their digital distribution across India and overseas markets."
      badge="Supplier Portal"
      icon={Store}
      metrics={[
        { value: '0% Fee', label: 'On First 5 Orders' },
        { value: '5,000+', label: 'Active Buyers' },
        { value: 'Instant', label: 'Escrow Settlement' },
      ]}
      customContent={customContent}
      ctaText="Start Selling Today"
      ctaLink="/register?role=supplier"
    />
  );
}

export default SupplierGuidePage;
