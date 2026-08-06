import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Cookie, CheckSquare, Settings2, ShieldOff } from 'lucide-react';

function CookiePolicyPage() {
  return (
    <InfoPageLayout
      title="Cookie Policy"
      subtitle="Understanding how we use cookies and tracking technologies to improve your experience."
      badge="Legal & Policy"
      icon={Cookie}
      sections={[
        {
          title: 'Essential Cookies',
          content: 'Used to maintain your secure login session and remember your basic preferences while navigating the marketplace.',
          icon: CheckSquare,
        },
        {
          title: 'Performance & Analytics',
          content: 'Anonymous tracking helps us understand which features are used most and how to optimize platform performance.',
          icon: Settings2,
        },
        {
          title: 'Managing Preferences',
          content: 'You can control or disable non-essential cookies at any time through your browser settings or our consent manager.',
          icon: ShieldOff,
        },
      ]}
    />
  );
}

export default CookiePolicyPage;
