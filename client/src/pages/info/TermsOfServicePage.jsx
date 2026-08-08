import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { FileText, Gavel, Scale, ShieldCheck } from 'lucide-react';

const TERMS_SECTIONS = [
  {
    title: '1. Platform Marketplace Membership',
    content: 'Registration is permitted for verified businesses, textile mills, garment manufacturers, and authorized procurement representatives with valid GST or commercial identification.',
  },
  {
    title: '2. Escrow & Commercial Settlement',
    content: 'All wholesale transactions executed on TextileHub are bound by Escrow commercial terms. Funds remain protected until delivery receipt confirmation or dispute resolution finality.',
  },
  {
    title: '3. GST & Tax Compliance',
    content: 'Suppliers guarantee the accuracy of GST tax rates, HSN codes, and e-Way bills generated for fabric shipments dispatched through the platform.',
  },
  {
    title: '4. Dispute Arbitration Jurisdiction',
    content: 'Any legal disputes arising from wholesale contracts concluded on the platform shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat, India.',
  },
];

function TermsOfServicePage() {
  const customContent = (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-6">
      <div className="border-b border-[#EEF2F7] pb-4">
        <h2 className="text-xl font-bold text-[#111827]">Terms of Service & Commercial Trade Agreement</h2>
        <p className="text-xs text-[#6B7280]">Last Revised: August 2026 • TextileHub B2B Framework</p>
      </div>

      <div className="space-y-6 text-sm text-[#374151]">
        {TERMS_SECTIONS.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="font-bold text-[#111827] text-base">{sec.title}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed font-normal">{sec.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="Terms of Service"
      subtitle="Standard B2B commercial agreement governing marketplace buyer accounts, supplier listing obligations, escrow payouts, and GST compliance."
      badge="Commercial Terms"
      icon={FileText}
      metrics={[
        { value: 'B2B Trade', label: 'Escrow Standard' },
        { value: 'Surat', label: 'Legal Jurisdiction' },
        { value: 'GST', label: 'Tax Compliant' },
      ]}
      customContent={customContent}
    />
  );
}

export default TermsOfServicePage;
