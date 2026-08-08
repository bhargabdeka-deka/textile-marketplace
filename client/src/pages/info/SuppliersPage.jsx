import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Building2, ShieldCheck, MapPin, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MILLS = [
  {
    name: 'Surat Silk & Jacquard Mills',
    location: 'Ring Road, Surat, Gujarat',
    capacity: '50,000 m / month',
    specialty: 'Royal Satin, Silk Jacquards, Organza',
    gstVerified: true,
    verifiedSince: '2023',
  },
  {
    name: 'Ahmedabad Combed Cotton Weavers',
    location: 'Narol Industrial Estate, Ahmedabad, Gujarat',
    capacity: '80,000 m / month',
    specialty: '240 GSM Cotton Twill, Poplin, Denim',
    gstVerified: true,
    verifiedSince: '2022',
  },
  {
    name: 'Tirupur Organic Knitwear Mill',
    location: 'Avinashi Road, Tirupur, Tamil Nadu',
    capacity: '120,000 m / month',
    specialty: 'GOTS Organic Jersey, Ribbed Cotton, Fleece',
    gstVerified: true,
    verifiedSince: '2024',
  },
  {
    name: 'Panipat Flax & Linen Cluster',
    location: 'Industrial Area, Panipat, Haryana',
    capacity: '40,000 m / month',
    specialty: '60 Lea Pure Flax Linen, Slub Weaves',
    gstVerified: true,
    verifiedSince: '2023',
  },
];

function SuppliersPage() {
  const customContent = (
    <div className="space-y-6">
      <div className="border-b border-[#E5E7EB] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Audited Regional Textile Mills</h2>
          <p className="text-xs text-[#6B7280]">Connect directly with verified manufacturing facilities</p>
        </div>
        <Link
          to="/register?role=supplier"
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors shadow-xs flex items-center gap-1"
        >
          <span>Register Your Mill</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MILLS.map((m, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#2563EB] flex items-center gap-1">
                  <MapPin size={13} /> {m.location}
                </span>
                <h3 className="text-base font-bold text-[#111827]">{m.name}</h3>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#16A34A] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                <ShieldCheck size={14} /> GST Audited
              </span>
            </div>

            <div className="pt-2 border-t border-[#EEF2F7] grid grid-cols-2 gap-2 text-xs text-[#6B7280]">
              <div>
                <p className="font-semibold text-[#111827]">Production Capacity</p>
                <p>{m.capacity}</p>
              </div>
              <div>
                <p className="font-semibold text-[#111827]">Specialty Fabrics</p>
                <p className="truncate">{m.specialty}</p>
              </div>
            </div>

            <Link
              to="/products"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#FAFBFC] border border-[#E5E7EB] hover:bg-gray-100 text-[#111827] transition-colors"
            >
              <span>View Mill Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="Verified Textile Mills Directory"
      subtitle="Source directly from GST-verified weaving units, composite mills, and textile printing clusters in Surat, Ahmedabad, and Tirupur."
      badge="Mill Directory"
      icon={Building2}
      metrics={[
        { value: '1,200+', label: 'Verified Mills' },
        { value: '100%', label: 'GST Audited' },
        { value: 'Direct', label: 'Factory Pricing' },
      ]}
      customContent={customContent}
    />
  );
}

export default SuppliersPage;
