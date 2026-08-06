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
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-dashed border-[var(--color-border)] bg-neutral-50/50 dark:bg-neutral-900/20">
      <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mb-6 shadow-sm">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-[var(--color-text)] mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-muted)] max-w-sm mb-8 leading-relaxed">
        {description}
      </p>
      {actionText && actionLink && (
        <Link 
          to={actionLink}
          className="px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
        >
          {actionText}
        </Link>
      )}
      {actionText && !actionLink && (
        <button 
          className="px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
