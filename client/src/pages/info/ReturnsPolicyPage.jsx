import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { RotateCcw, ShieldAlert, AlertTriangle, FileCheck } from 'lucide-react';

function ReturnsPolicyPage() {
  return (
    <InfoPageLayout
      title="Returns & Disputes Policy"
      subtitle="Our transparent policy for handling fabric defects, quantity mismatches, and trade disputes."
      badge="Legal & Policy"
      icon={RotateCcw}
      sections={[
        {
          title: 'Defect Criteria',
          content: 'Returns are accepted for major weaving defects, incorrect dye lots, or significant GSM variations outside industry tolerances.',
          icon: ShieldAlert,
        },
        {
          title: 'Reporting Timeline',
          content: 'Buyers must report any discrepancies or quality issues within 48 hours of delivery receipt to initiate a claim.',
          icon: AlertTriangle,
        },
        {
          title: 'Dispute Resolution',
          content: 'TextileHub mediates disputes using approved third-party laboratory testing to ensure fair resolution for both parties.',
          icon: FileCheck,
        },
      ]}
    />
  );
}

export default ReturnsPolicyPage;
