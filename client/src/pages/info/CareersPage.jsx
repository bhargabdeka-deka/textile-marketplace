import React from 'react';
import InfoPageLayout from '@/components/common/InfoPageLayout';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const OPEN_POSITIONS = [
  {
    id: 'eng-01',
    title: 'Lead Full-Stack Engineer (React 19 & Node.js)',
    department: 'Engineering',
    location: 'Surat, Gujarat / Remote',
    type: 'Full-Time',
    experience: '4+ Years',
    description: 'Build high-performance B2B trade engine, real-time inventory synchronization, and AI fabric query parsers.',
  },
  {
    id: 'biz-02',
    title: 'Enterprise Mill Onboarding Manager',
    department: 'Supplier Operations',
    location: 'Ahmedabad, Gujarat',
    type: 'Full-Time',
    experience: '3+ Years',
    description: 'Partner directly with textile weaving mills in Gujarat and Tamil Nadu to digitize product catalogs and audit manufacturing capacity.',
  },
  {
    id: 'qa-03',
    title: 'Textile Fabric Quality Auditor',
    department: 'Quality Control',
    location: 'Tirupur, Tamil Nadu',
    type: 'Full-Time',
    experience: '5+ Years',
    description: 'Conduct GSM audits, yarn count lab tests, and color fastness evaluations for export-bound wholesale shipments.',
  },
];

function CareersPage() {
  const customContent = (
    <div className="space-y-8">
      {/* Company Culture & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
            <Zap size={20} />
          </div>
          <h3 className="font-bold text-[#111827] text-base">Impact at Scale</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Digitizing India's $150B+ textile industry and empowering thousands of weavers and garment exporters.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Heart size={20} />
          </div>
          <h3 className="font-bold text-[#111827] text-base">Comprehensive Benefits</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Competitive salary, ESOP equity grants, premium health insurance for families, and annual learning stipends.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <GraduationCap size={20} />
          </div>
          <h3 className="font-bold text-[#111827] text-base">Rapid Career Growth</h3>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Fast-paced environment with clear promotion tracks, mentorship from industry veterans, and continuous upskilling.
          </p>
        </div>
      </div>

      {/* Open Positions List */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs space-y-6">
        <div className="border-b border-[#EEF2F7] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Open Positions ({OPEN_POSITIONS.length})</h2>
            <p className="text-xs text-[#6B7280]">Join our high-performing team shaping the future of global textile trade</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Actively Hiring
          </span>
        </div>

        <div className="space-y-4">
          {OPEN_POSITIONS.map((pos) => (
            <div
              key={pos.id}
              className="p-6 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] hover:border-gray-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md font-semibold bg-[#2563EB]/10 text-[#2563EB]">
                    {pos.department}
                  </span>
                  <span className="text-[#6B7280] flex items-center gap-1">
                    <MapPin size={13} /> {pos.location}
                  </span>
                  <span className="text-[#6B7280] flex items-center gap-1">
                    <Clock size={13} /> {pos.type}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111827]">{pos.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed font-normal">{pos.description}</p>
              </div>

              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#111827] hover:bg-[#2563EB] text-white transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Apply Now</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <InfoPageLayout
      title="Careers at TextileHub"
      subtitle="Help build the digital nervous system for global textile trade. We're looking for ambitious engineers, trade operators, and quality auditors."
      badge="We're Hiring"
      icon={Briefcase}
      metrics={[
        { value: '3 Hubs', label: 'Surat, Ahmedabad, Remote' },
        { value: '4.8 ★', label: 'Glassdoor Rating' },
        { value: 'ESOPs', label: 'Equity Grant Available' },
      ]}
      customContent={customContent}
    />
  );
}

export default CareersPage;
