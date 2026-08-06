import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Store, ShieldCheck, Factory, Handshake } from 'lucide-react';

function SuppliersPage() {
  return (
    <InfoPageLayout
      title="Verified Textile Suppliers"
      subtitle="Discover our network of trusted textile manufacturers, weaving mills, and wholesale distributors."
      badge="Supplier Directory"
      icon={Store}
      sections={[
        {
          title: 'Direct from Manufacturers',
          content: 'Connect with primary sources in Surat, Tirupur, Panipat, and Ahmedabad for the best pricing.',
          icon: Factory,
        },
        {
          title: 'Verified & Certified',
          content: 'Every supplier listed has passed our stringent 5-point verification process including GST and production capacity checks.',
          icon: ShieldCheck,
        },
        {
          title: 'Secure Trade',
          content: 'Negotiate terms, place bulk orders, and secure transactions safely through the TextileHub platform.',
          icon: Handshake,
        },
      ]}
    />
  );
}

export default SuppliersPage;
