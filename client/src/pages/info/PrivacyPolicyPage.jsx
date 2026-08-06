import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Shield, Lock, EyeOff, Database } from 'lucide-react';

function PrivacyPolicyPage() {
  return (
    <InfoPageLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal and business data on TextileHub."
      badge="Legal & Policy"
      icon={Shield}
      sections={[
        {
          title: 'Data Collection',
          content: 'We collect business registration details, contact information, and transaction history strictly to facilitate B2B trade.',
          icon: Database,
        },
        {
          title: 'Data Protection',
          content: 'All sensitive data is encrypted in transit and at rest. We do not sell your contact information to third-party marketers.',
          icon: Lock,
        },
        {
          title: 'Your Privacy Rights',
          content: 'You have the right to request access to your data, request deletion of your account, and manage your communication preferences.',
          icon: EyeOff,
        },
      ]}
    />
  );
}

export default PrivacyPolicyPage;
