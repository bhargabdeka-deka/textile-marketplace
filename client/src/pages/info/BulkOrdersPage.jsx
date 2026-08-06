import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Boxes, PackageCheck, Truck, Percent } from 'lucide-react';

function BulkOrdersPage() {
  return (
    <InfoPageLayout
      title="Enterprise Bulk Orders"
      subtitle="Streamlined procurement for high-volume buyers, garment manufacturers, and export houses."
      badge="Enterprise Solutions"
      icon={Boxes}
      sections={[
        {
          title: 'Volume Discounts',
          content: 'Unlock tiered pricing and negotiate directly with mill owners for orders exceeding 10,000 meters.',
          icon: Percent,
        },
        {
          title: 'Logistics Support',
          content: 'End-to-end freight management, from mill dispatch to your factory floor, with real-time tracking.',
          icon: Truck,
        },
        {
          title: 'Quality Assurance',
          content: 'Request physical samples, arrange third-party lab testing, and ensure exact color matching before bulk production.',
          icon: PackageCheck,
        },
      ]}
    />
  );
}

export default BulkOrdersPage;
