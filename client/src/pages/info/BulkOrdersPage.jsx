import React, { useState } from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Boxes, Percent, Truck, ShieldCheck, Calculator, Send, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const DISCOUNT_TIERS = [
  { meters: '1,000 m – 4,999 m', discount: '5% Off Factory Rate', sample: 'Free Swatch Kit' },
  { meters: '5,000 m – 19,999 m', discount: '12% Off Factory Rate', sample: 'Lab Test Report Included' },
  { meters: '20,000 m +', discount: 'Direct Mill Negotiated', sample: 'Dedicated Mill Liaison & Custom Dyeing' },
];

function BulkOrdersPage() {
  const [meters, setMeters] = useState(2500);
  const [ratePerMeter, setRatePerMeter] = useState(180);

  const rawTotal = meters * ratePerMeter;
  const discountPercent = meters >= 20000 ? 0.18 : meters >= 5000 ? 0.12 : meters >= 1000 ? 0.05 : 0;
  const estimatedSavings = rawTotal * discountPercent;
  const netTotal = rawTotal - estimatedSavings;

  const handleRfqSubmit = (e) => {
    e.preventDefault();
    toast.success('Bulk RFQ submitted! Our mill account manager will send a custom quota within 2 hours.');
  };

  const customContent = (
    <div className="space-y-8">
      {/* Tiered Discount Schedule */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-6">
        <div className="border-b border-[#EEF2F7] pb-4">
          <h2 className="text-xl font-bold text-[#111827]">Volume Discount Schedule</h2>
          <p className="text-xs text-[#6B7280]">Tiered pricing discounts applied automatically at wholesale checkout</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DISCOUNT_TIERS.map((t, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] space-y-2">
              <span className="text-xs font-semibold text-[#2563EB]">{t.meters}</span>
              <h3 className="text-base font-bold text-[#111827]">{t.discount}</h3>
              <p className="text-xs text-[#6B7280] font-medium">{t.sample}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Bulk Pricing Estimator */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-6">
        <div className="border-b border-[#EEF2F7] pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <Calculator size={20} className="text-[#2563EB]" />
              <span>Bulk Order Pricing Estimator</span>
            </h2>
            <p className="text-xs text-[#6B7280]">Calculate volume savings based on required meterage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#111827] mb-2">
                <span>Fabric Quantity (Meters)</span>
                <span className="text-[#2563EB] font-bold">{meters.toLocaleString()} meters</span>
              </div>
              <input
                type="range"
                min="500"
                max="30000"
                step="500"
                value={meters}
                onChange={(e) => setMeters(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#111827] mb-2">
                <span>Base Mill Rate / Meter</span>
                <span>₹{ratePerMeter} / m</span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="10"
                value={ratePerMeter}
                onChange={(e) => setRatePerMeter(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAFBFC] p-6 rounded-xl border border-[#E5E7EB] space-y-3">
            <div className="flex justify-between text-xs text-[#6B7280]">
              <span>Gross Order Value:</span>
              <span className="font-semibold text-[#111827]">₹{rawTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-emerald-600 font-semibold">
              <span>Volume Savings ({(discountPercent * 100).toFixed(0)}%):</span>
              <span>- ₹{estimatedSavings.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-[#EEF2F7] flex justify-between items-baseline">
              <span className="text-xs font-bold text-[#111827]">Estimated Net Total:</span>
              <span className="text-xl font-bold text-[#2563EB]">₹{netTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="Enterprise Bulk Fabric Procurement"
      subtitle="Custom dyeing batches, mill-direct volume pricing, and dedicated freight logistics for high-volume garment exporters."
      badge="Enterprise Sourcing"
      icon={Boxes}
      metrics={[
        { value: 'Up to 18%', label: 'Volume Discounts' },
        { value: 'Custom', label: 'Lab & Dye Matching' },
        { value: '100%', label: 'Escrow Payout Protection' },
      ]}
      customContent={customContent}
    />
  );
}

export default BulkOrdersPage;
