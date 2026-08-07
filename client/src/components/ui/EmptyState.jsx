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
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-subtle)]">
      <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] mb-4 shadow-[var(--shadow-subtle)]">
        <Icon size={24} strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1.5 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && actionLink && (
        <Link 
          to={actionLink}
          className="ui-button ui-button-primary ui-button-md shadow-[var(--shadow-card)]"
        >
          {actionText}
        </Link>
      )}
      {actionText && !actionLink && (
        <button 
          className="ui-button ui-button-primary ui-button-md shadow-[var(--shadow-card)]"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
