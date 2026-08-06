/**
 * src/hooks/useApi.js
 *
 * Generic data-fetching hook for API calls.
 * Manages loading, error, and data state in a single reusable hook.
 *
 * Usage:
 *   const { data, loading, error, refetch } = useApi(productService.getProducts, { page: 1 });
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * @template T
 * @param {Function} apiFunc     - The service function to call
 * @param {*}        params      - Parameters to pass to the function
 * @param {boolean}  immediate   - Call immediately on mount (default: true)
 */
function useApi(apiFunc, params = null, immediate = true) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error,   setError]   = useState(null);

  const execute = useCallback(
    async (overrideParams) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunc(overrideParams ?? params);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message || 'Something went wrong');
        return null;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiFunc]
  );

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    refetch: execute, // Expose as `refetch` for explicit re-triggers
  };
}

export default useApi;
