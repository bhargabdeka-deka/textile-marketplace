/**
 * src/utils/formatters.js
 *
 * Pure utility functions for data formatting.
 * No React dependencies — can be unit tested standalone.
 */

/**
 * formatCurrency — format a number as Indian Rupees
 * @param {number} amount
 * @param {string} currency - ISO 4217 currency code (default: INR)
 */
export const formatCurrency = (amount, currency = 'INR') => {
  if (amount == null || isNaN(amount)) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * formatDate — format a date string to a readable format
 * @param {string|Date} date
 * @param {Intl.DateTimeFormatOptions} options
 */
export const formatDate = (date, options = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  if (!date) return '—';
  try {
    return new Intl.DateTimeFormat('en-IN', options).format(new Date(date));
  } catch {
    return '—';
  }
};

/**
 * formatRelativeTime — e.g. "2 hours ago", "3 days ago"
 * @param {string|Date} date
 */
export const formatRelativeTime = (date) => {
  if (!date) return '—';
  const diff = (Date.now() - new Date(date).getTime()) / 1000; // seconds

  if (diff < 60)            return 'just now';
  if (diff < 3600)          return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)         return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000)       return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(date);
};

/**
 * truncate — trim a string and append ellipsis if over maxLength
 */
export const truncate = (str, maxLength = 80) => {
  if (!str) return '';
  return str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;
};

/**
 * slugify — convert a string to URL-safe slug
 * @example slugify('Cotton Fabric') → 'cotton-fabric'
 */
export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * capitalise — Title Case a string
 */
export const capitalise = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * getImageUrl — resolves Cloudinary or local image paths automatically
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    const baseDomain = apiUrl.replace(/\/api\/?$/, '');
    return `${baseDomain}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  }
  return `${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};
