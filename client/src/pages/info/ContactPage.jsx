import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

function ContactPage() {
  return (
    <InfoPageLayout
      title="Contact Support & Sales"
      subtitle="Have questions about bulk orders, supplier onboarding, or API access? Our team is available 24/7."
      badge="Get in Touch"
      icon={Mail}
      sections={[
        {
          title: 'Email Us',
          content: 'Reach out to support@textilehub.in for general queries or enterprise@textilehub.in for bulk trade inquiries.',
          icon: Mail,
        },
        {
          title: 'Call Support',
          content: 'Speak with a trade specialist at +91 98765 43210 available Mon-Sat, 9:00 AM - 7:00 PM IST.',
          icon: Phone,
        },
        {
          title: 'Corporate Headquarters',
          content: 'TextileHub Plaza, Ring Road Textile Market, Surat, Gujarat 395002, India.',
          icon: MapPin,
        },
        {
          title: 'Live Chat Support',
          content: 'Connect instantly with our customer success team via WhatsApp or live chat during business hours.',
          icon: MessageSquare,
        },
      ]}
    />
  );
}

export default ContactPage;
