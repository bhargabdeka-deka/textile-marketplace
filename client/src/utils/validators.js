/**
 * src/utils/validators.js
 *
 * Reusable validation functions for React Hook Form and standalone use.
 * Returns an error message string on failure, or true on success.
 *
 * Usage with React Hook Form:
 *   <input {...register('email', { validate: validators.email })} />
 */

export const validators = {
  /**
   * required — field must not be empty
   */
  required: (value) =>
    (value !== undefined && value !== null && String(value).trim() !== '') ||
    'This field is required',

  /**
   * email — valid email format
   */
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim()) ||
    'Please enter a valid email address',

  /**
   * minLength — minimum character count
   */
  minLength: (min) => (value) =>
    String(value).trim().length >= min || `Must be at least ${min} characters`,

  /**
   * maxLength — maximum character count
   */
  maxLength: (max) => (value) =>
    String(value).trim().length <= max || `Must be at most ${max} characters`,

  /**
   * phone — basic Indian phone number (10 digits)
   */
  phone: (value) =>
    /^[6-9]\d{9}$/.test(String(value).replace(/\s/g, '')) ||
    'Enter a valid 10-digit mobile number',

  /**
   * positiveNumber — must be a number greater than 0
   */
  positiveNumber: (value) =>
    (Number(value) > 0 && !isNaN(Number(value))) || 'Must be a positive number',

  /**
   * url — valid URL
   */
  url: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  /**
   * pincode — 6-digit Indian PIN code
   */
  pincode: (value) =>
    /^\d{6}$/.test(String(value).trim()) || 'Enter a valid 6-digit PIN code',
};

export default validators;
