/**
 * src/pages/supplier/ProductFormPage.jsx
 *
 * Unified create / edit form for supplier product listings.
 * Route: /supplier/products/new      → create mode
 * Route: /supplier/products/:id/edit → edit mode (pre-fills form)
 *
 * Features:
 *  - React Hook Form with validation
 *  - Image upload preview (up to 8 images)
 *  - Image removal (keepImages array)
 *  - Multipart FormData submission
 *  - Category dropdown populated from API
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Upload, X, ChevronLeft, Package } from 'lucide-react';
import useProductStore from '@/store/productStore';
import productService from '@/services/product.service';
import Loading from '@/components/ui/Loading';

const FIELD = (label, id, error) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold mb-1.5 text-gray-900"
    >
      {label}
    </label>
    {error && <p className="text-xs text-red-500 mb-1">{error.message}</p>}
  </div>
);

const inputClass = 'w-full px-3 py-2.5 rounded-lg text-sm border border-gray-200 bg-white text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-150 shadow-sm';

function ProductFormPage() {
  const { id }       = useParams();          // present → edit mode
  const navigate     = useNavigate();
  const isEditMode   = Boolean(id);

  const { createProduct, updateProduct, fetchProductById, currentProduct, productLoading } =
    useProductStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { minOrderQuantity: 1, isActive: true } });

  const [categories,    setCategories]    = useState([]);
  const [newImages,     setNewImages]     = useState([]);     // File objects
  const [previewUrls,   setPreviewUrls]   = useState([]);     // blob: URLs for new files
  const [existingImgs,  setExistingImgs]  = useState([]);     // URLs from existing product
  const [removedImgs,   setRemovedImgs]   = useState([]);     // existing URLs to remove

  // Load categories
  useEffect(() => {
    productService.getCategories()
      .then((res) => setCategories(res.data || []))
      .catch(() => {});
  }, []);

  // Edit mode: load product and pre-fill
  useEffect(() => {
    if (isEditMode) {
      fetchProductById(id);
    }
  }, [id, isEditMode, fetchProductById]);

  useEffect(() => {
    if (isEditMode && currentProduct && currentProduct._id === id) {
      reset({
        title:            currentProduct.title,
        description:      currentProduct.description,
        category:         currentProduct.category,
        fabric:           currentProduct.fabric || '',
        gsm:              currentProduct.gsm || '',
        pricePerMeter:    currentProduct.pricePerMeter,
        minOrderQuantity: currentProduct.minOrderQuantity,
        stock:            currentProduct.stock,
        color:            currentProduct.color || '',
        width:            currentProduct.width || '',
        tags:             (currentProduct.tags || []).join(', '),
        isActive:         currentProduct.isActive,
      });
      setExistingImgs(currentProduct.images || []);
    }
  }, [currentProduct, id, isEditMode, reset]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 8 - existingImgs.filter((u) => !removedImgs.includes(u)).length;
    const toAdd = files.slice(0, remaining);

    const urls = toAdd.map((f) => URL.createObjectURL(f));
    setNewImages((prev) => [...prev, ...toAdd]);
    setPreviewUrls((prev) => [...prev, ...urls]);
    e.target.value = '';
  };

  const removeNewImage = (idx) => {
    URL.revokeObjectURL(previewUrls[idx]);
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const toggleRemoveExisting = (url) => {
    setRemovedImgs((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const totalImages =
    existingImgs.filter((u) => !removedImgs.includes(u)).length + newImages.length;

  const onSubmit = async (data) => {
    if (totalImages === 0 && !isEditMode) {
      toast.error('Please upload at least one product image');
      return;
    }

    const formData = new FormData();

    // Scalar fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    // New image files
    newImages.forEach((file) => formData.append('images', file));

    // Tell backend which existing images to keep
    const keepImages = existingImgs.filter((u) => !removedImgs.includes(u));
    formData.append('keepImages', JSON.stringify(keepImages));

    try {
      if (isEditMode) {
        await updateProduct(id, formData);
        toast.success('Product updated successfully');
      } else {
        await createProduct(formData);
        toast.success('Product created successfully');
      }
      navigate('/supplier/products');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  if (isEditMode && productLoading) {
    return <Loading variant="page" message="Loading product…" />;
  }

  return (
    <div className="bg-gray-50 min-h-[80vh] font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/supplier/products"
            className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronLeft size={18} />
          </Link>
          <div>
            <h1
              className="text-2xl font-bold text-gray-900"
            >
              {isEditMode ? 'Edit Product' : 'New Product Listing'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {isEditMode ? 'Update your product details' : 'Add a new textile product to the marketplace'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div
            className="rounded-2xl p-6 sm:p-8 space-y-6 bg-white border border-gray-200 shadow-sm"
          >

            {/* ── Images ──────────────────────────────────────────── */}
            <div>
              <p className="text-sm font-bold mb-3 text-gray-900">
                Product Images <span className="text-xs font-medium text-gray-500 ml-1">({totalImages}/8)</span>
              </p>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-3">
                {/* Existing images */}
                {existingImgs.map((url) => (
                  <div key={url} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                    <img src={url} alt="" className="w-full h-full object-cover transition-opacity" style={{ opacity: removedImgs.includes(url) ? 0.35 : 1 }} />
                    <button
                      type="button"
                      onClick={() => toggleRemoveExisting(url)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full text-white shadow-sm transition-colors"
                      style={{ backgroundColor: removedImgs.includes(url) ? '#16a34a' : '#ef4444' }}
                      aria-label={removedImgs.includes(url) ? 'Restore image' : 'Remove image'}
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </div>
                ))}

                {/* New preview images */}
                {previewUrls.map((url, idx) => (
                  <div key={url} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-sm transition-colors"
                      aria-label="Remove image"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </div>
                ))}

                {/* Upload trigger */}
                {totalImages < 8 && (
                  <label
                    className="aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-gray-400"
                  >
                    <Upload size={20} className="mb-1" />
                    <span className="text-xs font-medium">Add</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500">
                JPEG, PNG or WebP. Max 10 MB per file. Up to 8 images.
              </p>
            </div>

            <div className="h-px bg-gray-100 my-2" />

            {/* ── Title ─────────────────────────────────────────── */}
            <div>
              {FIELD('Title *', 'title', errors.title)}
              <input
                id="title"
                {...register('title', { required: 'Title is required', maxLength: { value: 200, message: 'Max 200 characters' } })}
                className={inputClass}
                placeholder="e.g. Premium Cotton Voile Fabric"
              />
            </div>

            {/* ── Description ───────────────────────────────────── */}
            <div>
              {FIELD('Description *', 'description', errors.description)}
              <textarea
                id="description"
                {...register('description', { required: 'Description is required', maxLength: { value: 2000, message: 'Max 2000 characters' } })}
                className={inputClass}
                rows={4}
                placeholder="Describe your fabric in detail — quality, finish, use cases…"
              />
            </div>

            {/* ── Category + Fabric ─────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                {FIELD('Category *', 'category', errors.category)}
                <select
                  id="category"
                  {...register('category', { required: 'Category is required' })}
                  className={inputClass}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                {FIELD('Fabric', 'fabric', errors.fabric)}
                <input
                  id="fabric"
                  {...register('fabric')}
                  className={inputClass}
                  placeholder="e.g. 100% Cotton"
                />
              </div>
            </div>

            {/* ── GSM + Color + Width ───────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                {FIELD('GSM', 'gsm', errors.gsm)}
                <input
                  id="gsm"
                  type="number"
                  min={1}
                  {...register('gsm', { min: { value: 1, message: 'Min 1' } })}
                  className={inputClass}
                  placeholder="e.g. 120"
                />
              </div>
              <div>
                {FIELD('Color', 'color', errors.color)}
                <input
                  id="color"
                  {...register('color')}
                  className={inputClass}
                  placeholder="e.g. Ivory"
                />
              </div>
              <div>
                {FIELD('Width (cm)', 'width', errors.width)}
                <input
                  id="width"
                  type="number"
                  min={1}
                  {...register('width', { min: { value: 1, message: 'Min 1 cm' } })}
                  className={inputClass}
                  placeholder="e.g. 150"
                />
              </div>
            </div>

            {/* ── Price + MOQ + Stock ───────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                {FIELD('Price / Metre (₹) *', 'pricePerMeter', errors.pricePerMeter)}
                <input
                  id="pricePerMeter"
                  type="number"
                  min={0.01}
                  step="0.01"
                  {...register('pricePerMeter', {
                    required: 'Price is required',
                    min: { value: 0.01, message: 'Must be > 0' },
                  })}
                  className={inputClass}
                  placeholder="0.00"
                />
              </div>
              <div>
                {FIELD('Min. Order (m) *', 'minOrderQuantity', errors.minOrderQuantity)}
                <input
                  id="minOrderQuantity"
                  type="number"
                  min={1}
                  {...register('minOrderQuantity', {
                    required: 'Required',
                    min: { value: 1, message: 'Min 1' },
                  })}
                  className={inputClass}
                />
              </div>
              <div>
                {FIELD('Stock (m) *', 'stock', errors.stock)}
                <input
                  id="stock"
                  type="number"
                  min={0}
                  {...register('stock', {
                    required: 'Stock is required',
                    min: { value: 0, message: 'Cannot be negative' },
                  })}
                  className={inputClass}
                  placeholder="0"
                />
              </div>
            </div>

            {/* ── Tags ──────────────────────────────────────────── */}
            <div>
              {FIELD('Tags', 'tags', errors.tags)}
              <input
                id="tags"
                {...register('tags')}
                className={inputClass}
                placeholder="e.g. premium, summer, bridal (comma separated)"
              />
            </div>

            {/* ── Listing Active toggle ─────────────────────────── */}
            {isEditMode && (
              <div className="flex items-center gap-3 pt-2">
                <input
                  id="isActive"
                  type="checkbox"
                  {...register('isActive')}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <label htmlFor="isActive" className="text-sm font-medium cursor-pointer text-gray-900">
                  Listing is active (visible on marketplace)
                </label>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col-reverse sm:flex-row items-center gap-3 mt-6">
            <Link
              to="/supplier/products"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors bg-white shadow-sm text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-70 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              {isSubmitting
                ? (isEditMode ? 'Saving…' : 'Creating…')
                : (isEditMode ? 'Save Changes' : 'Publish Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormPage;
