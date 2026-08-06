import React from 'react';

function Skeleton({ className, type = 'card' }) {
  if (type === 'product-card') {
    return (
      <div className={`rounded-2xl border border-[var(--color-border)] overflow-hidden bg-white dark:bg-black flex flex-col h-full animate-pulse ${className || ''}`}>
        <div className="w-full aspect-[4/3] bg-neutral-200 dark:bg-neutral-800" />
        <div className="p-5 flex flex-col flex-grow">
          <div className="w-1/3 h-4 bg-neutral-200 dark:bg-neutral-800 rounded mb-3" />
          <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-800 rounded mb-4" />
          <div className="space-y-2 mb-6">
            <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="w-5/6 h-3 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
          <div className="mt-auto flex items-center justify-between">
            <div className="w-1/4 h-6 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="w-1/4 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table-row') {
    return (
      <div className={`flex items-center space-x-4 py-4 px-6 border-b border-[var(--color-border)] animate-pulse ${className || ''}`}>
        <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-3 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>
        <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
      </div>
    );
  }

  return (
    <div className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded ${className || ''}`} />
  );
}

export default Skeleton;
