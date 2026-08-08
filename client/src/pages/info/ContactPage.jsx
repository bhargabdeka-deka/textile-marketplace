import React, { useState } from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Inquiry submitted! Our trade specialist will contact you within 2 business hours.');
      setFormData({ name: '', email: '', phone: '', company: '', subject: 'General Inquiry', message: '' });
    }, 800);
  };

  const customContent = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Contact Details Card */}
      <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Direct Contact Channels</h2>
          <p className="text-xs text-[#6B7280] mt-1">Speak directly with our trade advisory team</p>
        </div>

        <div className="space-y-4 text-sm text-[#374151]">
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB]">
            <Mail className="text-[#2563EB] shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-semibold text-[#111827]">Email Inquiries</p>
              <p className="text-xs text-[#6B7280]">support@textilehub.in</p>
              <p className="text-xs text-[#6B7280]">enterprise@textilehub.in</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB]">
            <Phone className="text-[#2563EB] shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-semibold text-[#111827]">Phone & WhatsApp Trade Line</p>
              <p className="text-xs text-[#6B7280]">+91 98765 43210 / +91 98765 43211</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB]">
            <MapPin className="text-[#2563EB] shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-semibold text-[#111827]">Corporate Headquarters</p>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                TextileHub Plaza, Ring Road Textile Market, Surat, Gujarat 395002, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB]">
            <Clock className="text-[#2563EB] shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-semibold text-[#111827]">Operating Hours</p>
              <p className="text-xs text-[#6B7280]">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Inquiry Form */}
      <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Send a Trade Inquiry</h2>
          <p className="text-xs text-[#6B7280] mt-1">Request custom fabric swatches, mill catalogs, or bulk RFQs</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rajesh Kumar"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">Work Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rajesh@fashionbrand.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 00000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#111827] mb-1">Inquiry Category</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] transition-colors bg-white"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Bulk Purchase RFQ">Bulk Purchase RFQ (&gt; 5,000m)</option>
                <option value="Supplier Onboarding">Supplier Mill Onboarding</option>
                <option value="Sample Swatch Request">Sample Swatch Request</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111827] mb-1">Message Details *</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your fabric requirement (GSM, material composition, MOQ, target delivery timeline)..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:border-[#2563EB] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors shadow-xs"
          >
            <Send size={14} />
            <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="Contact Sales & Support"
      subtitle="Have questions about bulk fabric sourcing, supplier verification, or sample dispatches? Our trade advisory team is available 24/7."
      badge="Trade Support & Assistance"
      icon={Mail}
      metrics={[
        { value: '< 2 Hours', label: 'Response Time' },
        { value: '24 / 7', label: 'WhatsApp Assistance' },
        { value: '100%', label: 'Dedicated Account Executive' },
      ]}
      customContent={customContent}
    />
  );
}

export default ContactPage;
