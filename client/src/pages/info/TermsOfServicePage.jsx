import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Scale, FileText, Gavel, AlertOctagon } from 'lucide-react';

function TermsOfServicePage() {
  return (
    <InfoPageLayout
      title="Terms of Service"
      subtitle="The legal agreements governing your use of the TextileHub marketplace platform."
      badge="Legal & Policy"
      icon={Scale}
      sections={[
        {
          title: 'User Obligations',
          content: 'By accessing the platform, users agree to provide accurate business information and adhere to fair trade practices.',
          icon: FileText,
        },
        {
          title: 'Platform Liability',
          content: 'TextileHub acts as a facilitator and is not a direct party to the transaction between buyers and suppliers.',
          icon: AlertOctagon,
        },
        {
          title: 'Dispute & Jurisdiction',
          content: 'Any legal disputes arising from platform usage are subject to the exclusive jurisdiction of the courts in Surat, Gujarat.',
          icon: Gavel,
        },
      ]}
    />
  );
}

export default TermsOfServicePage;
