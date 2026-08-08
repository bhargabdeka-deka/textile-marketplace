import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Shield, Lock, EyeOff, Database } from 'lucide-react';

const PRIVACY_SECTIONS = [
  {
    title: '1. Information We Collect',
    content: 'We collect corporate registration details (GSTIN, PAN, Business Name), contact details (work email, phone number, shipping addresses), and transaction history to facilitate B2B orders and issue tax invoices.',
  },
  {
    title: '2. Encryption & Data Protection',
    content: 'All passwords are hashed using bcrypt. Sensitive data in transit is encrypted via TLS 1.3/HTTPS, and authentication state is secured using JWTs with strict expiration lifetimes.',
  },
  {
    title: '3. Data Sharing & Third Parties',
    content: 'We do not sell or rent your corporate contact information. Information is shared strictly with audited freight partners (for order delivery) and payment gateways (for transaction processing).',
  },
  {
    title: '4. Buyer & Supplier Rights',
    content: 'Users maintain the right to inspect, export, or request deletion of their account data at any time by contacting privacy@textilehub.in.',
  },
];

function PrivacyPolicyPage() {
  const customContent = (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-6">
      <div className="border-b border-[#EEF2F7] pb-4">
        <h2 className="text-xl font-bold text-[#111827]">Privacy Policy & Data Protection Framework</h2>
        <p className="text-xs text-[#6B7280]">Effective Date: August 2026 • TextileHub Technologies Private Limited</p>
      </div>

      <div className="space-y-6 text-sm text-[#374151]">
        {PRIVACY_SECTIONS.map((sec, idx) => (
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
      title="Privacy Policy"
      subtitle="How TextileHub protects corporate data, safeguards GST records, and enforces enterprise security controls across our B2B trade platform."
      badge="Privacy & Security"
      icon={Shield}
      metrics={[
        { value: '256-Bit', label: 'AES Encryption' },
        { value: 'Zero', label: 'Third-Party Data Sales' },
        { value: '100%', label: 'GDPR & DPDP Compliant' },
      ]}
      customContent={customContent}
    />
  );
}

export default PrivacyPolicyPage;
