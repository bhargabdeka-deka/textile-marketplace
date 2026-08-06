import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { ShoppingBag, Search, CheckCircle, CreditCard } from 'lucide-react';

function BuyerGuidePage() {
  return (
    <InfoPageLayout
      title="Buyer's Guide"
      subtitle="Everything you need to know about sourcing textiles, evaluating suppliers, and secure payments on TextileHub."
      badge="For Buyers"
      icon={ShoppingBag}
      sections={[
        {
          title: 'Sourcing the Right Fabric',
          content: 'Use our AI-powered search to find specific GSM, weave types, and compositions tailored to your production needs.',
          icon: Search,
        },
        {
          title: 'Evaluating Suppliers',
          content: 'Review supplier ratings, production capacities, and sample lead times before committing to a bulk order.',
          icon: CheckCircle,
        },
        {
          title: 'Secure Payments & Terms',
          content: 'Understand our escrow payment system, credit terms for verified buyers, and milestone-based payouts.',
          icon: CreditCard,
        },
      ]}
    />
  );
}

export default BuyerGuidePage;
