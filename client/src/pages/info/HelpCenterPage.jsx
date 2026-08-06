import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { LifeBuoy, HelpCircle, FileQuestion, MessageCircle } from 'lucide-react';

function HelpCenterPage() {
  return (
    <InfoPageLayout
      title="Help Center"
      subtitle="Find answers, troubleshooting guides, and get support for your TextileHub account."
      badge="Support"
      icon={LifeBuoy}
      sections={[
        {
          title: 'Frequently Asked Questions',
          content: 'Browse answers to common questions about payments, shipping, sample requests, and returns.',
          icon: HelpCircle,
        },
        {
          title: 'Platform Guides',
          content: 'Step-by-step tutorials on how to list products, manage inventory, or place bulk orders.',
          icon: FileQuestion,
        },
        {
          title: 'Contact Support',
          content: 'Cannot find what you need? Our team is available via email or live chat to assist you.',
          icon: MessageCircle,
        },
      ]}
    />
  );
}

export default HelpCenterPage;
