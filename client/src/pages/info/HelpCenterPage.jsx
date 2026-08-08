import React, { useState } from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { LifeBuoy, Search, ChevronDown, ChevronUp, HelpCircle, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    category: 'Orders & Procurement',
    question: 'What is the Minimum Order Quantity (MOQ) on TextileHub?',
    answer: 'MOQs vary by supplier and fabric type. Sample swatch orders start from 1 to 5 meters, while bulk orders typically start from 50 meters up to 10,000+ meters for custom dyeing.',
  },
  {
    category: 'Orders & Procurement',
    question: 'Can I request fabric swatches before placing a bulk order?',
    answer: 'Yes! Every product page includes a "Request Swatch" or direct sample cart option allowing buyers to inspect GSM, hand feel, and color fastness before bulk commitment.',
  },
  {
    category: 'Payments & Escrow',
    question: 'How does TextileHub protect buyer payments?',
    answer: 'Payments are held securely in an Escrow account. Funds are only released to the textile mill after the buyer receives and verifies the shipment quality against agreed specs.',
  },
  {
    category: 'Logistics & Dispatch',
    question: 'What are the delivery lead times for full rolls?',
    answer: 'In-stock rolls dispatch within 24-48 hours via express freight (3-5 business days across India). Custom dye batches require 7-14 business days depending on mill lead times.',
  },
  {
    category: 'Quality & Returns',
    question: 'What happens if the delivered fabric has weaving defects or color mismatch?',
    answer: 'Buyers have a 48-hour inspection window upon delivery. If defects exceed standard industry tolerances, TextileHub facilitates free return pick-up or mill replacement.',
  },
];

function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const customContent = (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[#111827]">How can we help you today?</h2>
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-[#6B7280]" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs, e.g. 'Escrow payment', 'MOQ', 'Sample swatch', 'Returns'..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E5E7EB] text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] transition-colors"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-4">
        <div className="border-b border-[#EEF2F7] pb-4">
          <h2 className="text-xl font-bold text-[#111827]">Frequently Asked Questions</h2>
          <p className="text-xs text-[#6B7280]">Instant answers to common procurement & supplier queries</p>
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#E5E7EB] overflow-hidden transition-all bg-[#FAFBFC]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full px-5 py-4 text-left font-semibold text-sm text-[#111827] flex items-center justify-between gap-4 hover:text-[#2563EB] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle size={16} className="text-[#2563EB] shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-[#6B7280] leading-relaxed border-t border-[#EEF2F7] bg-white font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-[#6B7280] text-center py-6">No matching FAQs found. Please contact support.</p>
        )}
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="Help Center & Knowledge Base"
      subtitle="Find quick answers regarding bulk fabric procurement, payment escrow protection, sample swatch requests, and mill guidelines."
      badge="Support & Assistance"
      icon={LifeBuoy}
      metrics={[
        { value: '24 / 7', label: 'Support Desk' },
        { value: '100%', label: 'Escrow Coverage' },
        { value: '48 Hours', label: 'Dispute Resolution Window' },
      ]}
      customContent={customContent}
    />
  );
}

export default HelpCenterPage;
