import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Cookie, Shield, Eye, Lock } from 'lucide-react';

const COOKIE_TYPES = [
  {
    type: 'Essential Authentication Cookies',
    purpose: 'Required to maintain secure JWT user session tokens, role-based access state, and shopping cart persistence.',
  },
  {
    type: 'Performance & Analytics Cookies',
    purpose: 'Helps us measure marketplace page load speeds, search query efficiency, and buyer catalog navigation flow.',
  },
  {
    type: 'Preference Cookies',
    purpose: 'Stores your preferred GSM units, currency formatting, and recent search filters for seamless repeat sourcing.',
  },
];

function CookiePolicyPage() {
  const customContent = (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-6">
      <div className="border-b border-[#EEF2F7] pb-4">
        <h2 className="text-xl font-bold text-[#111827]">Cookie Usage & Session Policy</h2>
        <p className="text-xs text-[#6B7280]">Last Updated: August 2026</p>
      </div>

      <div className="space-y-4">
        {COOKIE_TYPES.map((c, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] space-y-1">
            <h3 className="font-bold text-[#111827] text-sm">{c.type}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed font-normal">{c.purpose}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="Cookie Policy"
      subtitle="Transparent explanation of how TextileHub uses essential cookies and local storage tokens to deliver a secure, responsive trade experience."
      badge="Session & Privacy"
      icon={Cookie}
      metrics={[
        { value: 'Zero', label: 'Ad Tracker Cookies' },
        { value: '256-Bit', label: 'Token Security' },
        { value: 'Session', label: 'Strict Expiration' },
      ]}
      customContent={customContent}
    />
  );
}

export default CookiePolicyPage;
