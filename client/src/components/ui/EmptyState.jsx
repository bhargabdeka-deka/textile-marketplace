import React from 'react';
import { PackageX } from 'lucide-react';
import { Link } from 'react-router-dom';

function EmptyState({ 
  icon: Icon = PackageX, 
  title = 'No items found', 
  description = 'There are currently no items to display here.',
  actionText,
  actionLink 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white shadow-xs">
      <div className="w-12 h-12 rounded-xl bg-[#FAFBFC] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] mb-4">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-[#111827] mb-1.5 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-[#6B7280] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && actionLink && (
        <Link 
          to={actionLink}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors shadow-xs"
        >
          {actionText}
        </Link>
      )}
      {actionText && !actionLink && (
        <button 
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
