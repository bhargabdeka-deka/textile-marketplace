import React from 'react';

function Skeleton({ className = '', type = 'card' }) {
  if (type === 'product-card') {
    return (
      <div className={`ui-card overflow-hidden flex flex-col h-full ${className}`}>
        <div className="w-full aspect-[4/3] skeleton" />
        <div className="p-5 flex flex-col flex-grow gap-3">
          <div className="w-1/3 h-4 skeleton rounded-md" />
          <div className="w-3/4 h-5 skeleton rounded-md" />
          <div className="space-y-2 mt-1">
            <div className="w-full h-3 skeleton rounded" />
            <div className="w-5/6 h-3 skeleton rounded" />
          </div>
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-[var(--color-border)]">
            <div className="w-1/3 h-6 skeleton rounded-md" />
            <div className="w-1/4 h-7 skeleton rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table-row') {
    return (
      <div className={`flex items-center space-x-4 py-4 px-6 border-b border-[var(--color-border)] ${className}`}>
        <div className="h-10 w-10 skeleton rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/4 skeleton rounded" />
          <div className="h-3 w-1/3 skeleton rounded" />
        </div>
        <div className="h-8 w-20 skeleton rounded-lg" />
      </div>
    );
  }

  return (
    <div className={`skeleton rounded-md ${className}`} />
  );
}

export default Skeleton;
