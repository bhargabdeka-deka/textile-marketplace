import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Compass, Upload, LayoutDashboard, Truck } from 'lucide-react';

function SupplierGuidePage() {
  return (
    <InfoPageLayout
      title="Supplier's Guide"
      subtitle="Maximize your digital presence, manage inventory efficiently, and grow your B2B sales network."
      badge="For Suppliers"
      icon={Compass}
      sections={[
        {
          title: 'Listing Optimization',
          content: 'Learn how to create high-converting product listings with clear images, accurate GSM, and detailed fabric specifications.',
          icon: Upload,
        },
        {
          title: 'Order Management',
          content: 'Navigate the supplier dashboard to track incoming purchase orders, update statuses, and manage inventory levels.',
          icon: LayoutDashboard,
        },
        {
          title: 'Fulfillment & Logistics',
          content: 'Guidelines on packaging standards, integrating with our freight partners, and ensuring timely dispatch.',
          icon: Truck,
        },
      ]}
    />
  );
}

export default SupplierGuidePage;
