import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { RotateCcw, ShieldAlert, AlertTriangle, FileCheck, CheckCircle2 } from 'lucide-react';

const POLICY_POINTS = [
  {
    title: '1. Defect Criteria & Quality Tolerances',
    content: 'Returns and replacements are accepted for major manufacturing defects including visible weaving glitches, oil stains, dye lot variations exceeding +/- 5% Delta E, or GSM deviations greater than +/- 5% from listed specifications.',
  },
  {
    title: '2. 48-Hour Inspection & Claim Window',
    content: 'Buyers must inspect shipments upon arrival and log any discrepancy or defect claims within 48 hours of delivery receipt via their buyer dashboard.',
  },
  {
    title: '3. Independent Lab Verification',
    content: 'In the event of a trade dispute regarding yarn count, fiber purity (e.g. 100% Cotton vs Blend), or shrinkage, TextileHub arranges independent testing at NABL-accredited textile laboratories.',
  },
  {
    title: '4. Refund & Replacement Terms',
    content: 'Confirmed defect claims are eligible for 100% escrow refund or immediate replacement shipment from the mill at zero additional freight cost to the buyer.',
  },
];

function ReturnsPolicyPage() {
  const customContent = (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-6">
      <div className="border-b border-[#EEF2F7] pb-4">
        <h2 className="text-xl font-bold text-[#111827]">Returns & Trade Dispute Resolution Terms</h2>
        <p className="text-xs text-[#6B7280]">Last Updated: August 2026 • Official Platform Legal Document</p>
      </div>

      <div className="space-y-6 text-sm text-[#374151]">
        {POLICY_POINTS.map((pt, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="font-bold text-[#111827] text-base">{pt.title}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed font-normal">{pt.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="Returns & Dispute Policy"
      subtitle="Fair, transparent legal terms governing quality claims, defect inspection windows, and escrow refund guarantees for B2B fabric orders."
      badge="Legal Policy"
      icon={RotateCcw}
      metrics={[
        { value: '48 Hours', label: 'Claim Window' },
        { value: 'NABL', label: 'Lab Accreditation' },
        { value: '100%', label: 'Escrow Refund Guard' },
      ]}
      customContent={customContent}
    />
  );
}

export default ReturnsPolicyPage;
