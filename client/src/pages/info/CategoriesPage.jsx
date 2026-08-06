import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Layers, Grid, Palette, Scissors } from 'lucide-react';

function CategoriesPage() {
  return (
    <InfoPageLayout
      title="Fabric Categories"
      subtitle="Browse our comprehensive catalog of textiles categorized by composition, weave, and application."
      badge="Explore Catalog"
      icon={Layers}
      sections={[
        {
          title: 'Natural Fibers',
          content: 'Source 100% Cotton, Premium Silk, Linen, and Wool directly from specialized regional weavers.',
          icon: Grid,
        },
        {
          title: 'Synthetics & Blends',
          content: 'High-performance Polyester, Nylon, Viscose, and custom Poly-Cotton blends for diverse applications.',
          icon: Palette,
        },
        {
          title: 'Specialty Fabrics',
          content: 'Denim, Technical Textiles, Sustainable Organic options, and specialized industrial fabrics.',
          icon: Scissors,
        },
      ]}
    />
  );
}

export default CategoriesPage;
