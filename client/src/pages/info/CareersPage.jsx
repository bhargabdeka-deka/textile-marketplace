import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Briefcase, Users, Heart, GraduationCap } from 'lucide-react';

function CareersPage() {
  return (
    <InfoPageLayout
      title="Careers at TextileHub"
      subtitle="Join us in organizing and digitizing the global textile supply chain. We are always looking for passionate builders."
      badge="We're Hiring"
      icon={Briefcase}
      sections={[
        {
          title: 'Engineering & Product',
          content: 'Help build scalable architecture to support millions of SKUs, complex logistics, and real-time trade negotiations.',
          icon: Users,
        },
        {
          title: 'Sales & Supplier Success',
          content: 'Work directly with India\'s top textile manufacturers to digitize their inventory and scale their digital footprint.',
          icon: Heart,
        },
        {
          title: 'Growth & Learning',
          content: 'We provide extensive training, competitive equity packages, and an environment that fosters rapid career progression.',
          icon: GraduationCap,
        },
      ]}
    />
  );
}

export default CareersPage;
