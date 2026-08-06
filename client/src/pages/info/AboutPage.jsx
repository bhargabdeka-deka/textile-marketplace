import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Building2, Globe, ShieldCheck, Zap } from 'lucide-react';

function AboutPage() {
  return (
    <InfoPageLayout
      title="About TextileHub"
      subtitle="India's leading B2B marketplace transforming raw textile procurement for manufacturers, mills, and fashion brands."
      badge="Our Story"
      icon={Building2}
      sections={[
        {
          title: 'Direct Sourcing',
          content: 'Connect directly with certified textile mills and weavers in Surat, Ahmedabad, Tirupur, and Panipat without middleman markups.',
          icon: Globe,
        },
        {
          title: 'Quality Assured',
          content: 'Every supplier on TextileHub undergoes rigorous identity, manufacturing capability, and GST verification before listing.',
          icon: ShieldCheck,
        },
        {
          title: 'AI-Powered Discovery',
          content: 'Find exact fabric compositions, GSM, weave patterns, and price per meter using natural language AI search.',
          icon: Zap,
        },
      ]}
    />
  );
}

export default AboutPage;
