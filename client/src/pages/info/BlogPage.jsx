import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Newspaper, Sparkles, TrendingUp, BookOpen } from 'lucide-react';

function BlogPage() {
  return (
    <InfoPageLayout
      title="TextileHub Insights & Blog"
      subtitle="Industry trends, fabric sourcing guides, cotton price indexes, and export strategies for textile trade."
      badge="Coming Soon"
      icon={Newspaper}
      sections={[
        {
          title: 'Market Trends & Price Index',
          content: 'Weekly updates on yarn rates, cotton spot prices, and raw material index trends across Indian hubs.',
          icon: TrendingUp,
        },
        {
          title: 'Sourcing Best Practices',
          content: 'Guides on evaluating GSM, shrinkage percentage, yarn counts, and color fastness for bulk purchases.',
          icon: BookOpen,
        },
        {
          title: 'Export & Trade Compliance',
          content: 'Understanding GST, e-Way bills, international shipping logistics, and customs documentation for textiles.',
          icon: Sparkles,
        },
      ]}
    />
  );
}

export default BlogPage;
