/**
 * src/store/productStore.js
 *
 * Zustand store for product catalogue state.
 * Manages marketplace browse state (filters, pagination, results)
 * and supplier's own product list independently.
 *
 * Not persisted — fresh data on every session.
 */

import { create } from 'zustand';
import productService from '@/services/product.service';
import toast from 'react-hot-toast';

const useProductStore = create((set, get) => ({
  // ── Marketplace Browse State ────────────────────────────────────────────────
  products:    [],
  total:       0,
  currentPage: 1,
  totalPages:  1,
  isLoading:   false,
  error:       null,

  filters: {
    search:   '',
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock:  false,
    sort:     'newest',
  },

  // ── Supplier Own Products State ─────────────────────────────────────────────
  myProducts:        [],
  myProductsLoading: false,
  myProductsTotal:   0,
  myProductsPage:    1,

  // ── Single Product State ────────────────────────────────────────────────────
  currentProduct: null,
  productLoading: false,

  // ── Actions ─────────────────────────────────────────────────────────────────

  /**
   * setFilter — update one or more filter fields and reset to page 1
   */
  setFilter: (updates) =>
    set((state) => ({
      filters: { ...state.filters, ...updates },
      currentPage: 1,
    })),

  resetFilters: () =>
    set({
      filters: {
        search:   '',
        category: '',
        minPrice: '',
        maxPrice: '',
        inStock:  false,
        sort:     'newest',
      },
      currentPage: 1,
    }),

  setPage: (page) => set({ currentPage: page }),

  /**
   * fetchProducts — call the API with current filters and page
   */
  fetchProducts: async () => {
    const { filters, currentPage } = get();
    set({ isLoading: true, error: null });

    try {
      const params = {
        page:     currentPage,
        limit:    12,
        sort:     filters.sort,
        ...(filters.search   && { search:   filters.search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.minPrice && { minPrice: filters.minPrice }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
        ...(filters.inStock  && { inStock:  'true' }),
      };

      const res = await productService.getProducts(params);

      set({
        products:    res.data || [],
        total:       res.meta?.total || 0,
        totalPages:  res.meta?.totalPages || 1,
        currentPage: currentPage,
        isLoading:   false,
        error:       null,
      });
    } catch (err) {
      set({ isLoading: false, error: err.response?.data?.message || err.message });
    }
  },

  /**
   * aiSearch — Uses AI to query the marketplace based on natural language.
   */
  aiSearch: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const res = await productService.aiSearch(query);
      set({
        products: res.data || [],
        total: res.data?.length || 0,
        totalPages: 1, // AI search usually doesn't have complex pagination
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, isLoading: false });
    }
  },

  /**
   * fetchProductById — load a single product into currentProduct
   */
  fetchProductById: async (id) => {
    set({ productLoading: true, currentProduct: null });
    try {
      const res = await productService.getProductById(id);
      set({ currentProduct: res.data, productLoading: false });
    } catch (err) {
      set({ productLoading: false });
      toast.error(err.response?.data?.message || err.message || 'Failed to load product');
    }
  },

  /**
   * fetchMyProducts — load authenticated supplier's own products
   */
  fetchMyProducts: async (page = 1) => {
    set({ myProductsLoading: true });
    try {
      const res = await productService.getMyProducts({ page, limit: 20 });
      set({
        myProducts:        res.data,
        myProductsTotal:   res.meta.total,
        myProductsPage:    res.meta.page,
        myProductsLoading: false,
      });
    } catch (err) {
      set({ myProductsLoading: false });
      toast.error(err.response?.data?.message || err.message || 'Failed to load your products');
    }
  },

  /**
   * createProduct — create and prepend to myProducts on success
   */
  createProduct: async (formData) => {
    const res = await productService.createProduct(formData);
    set((state) => ({
      myProducts: [res.data, ...state.myProducts],
      myProductsTotal: state.myProductsTotal + 1,
    }));
    return res.data;
  },

  /**
   * updateProduct — update in myProducts list on success
   */
  updateProduct: async (id, formData) => {
    const res = await productService.updateProduct(id, formData);
    set((state) => ({
      myProducts: state.myProducts.map((p) =>
        p._id === id ? res.data : p
      ),
      currentProduct: state.currentProduct?._id === id ? res.data : state.currentProduct,
    }));
    return res.data;
  },

  /**
   * deleteProduct — remove from myProducts list on success
   */
  deleteProduct: async (id) => {
    await productService.deleteProduct(id);
    set((state) => ({
      myProducts: state.myProducts.filter((p) => p._id !== id),
      myProductsTotal: state.myProductsTotal - 1,
    }));
  },
}));

export default useProductStore;
