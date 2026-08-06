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
      className="block text-sm font-semibold mb-1.5"
      style={{ color: 'var(--color-text)' }}
    >
      {label}
    </label>
    {error && <p className="text-xs text-red-500 mb-1">{error.message}</p>}
  </div>
);

const inputClass = 'w-full px-3 py-2.5 rounded-lg text-sm border outline-none transition-colors duration-150';
const inputStyle = {
  borderColor: 'var(--color-border)',
  backgroundColor: 'var(--color-bg)',
  color: 'var(--color-text)',
};

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
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/supplier/products"
            className="p-2 rounded-lg border"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
          >
            <ChevronLeft size={18} />
          </Link>
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              {isEditMode ? 'Edit Product' : 'New Product Listing'}
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
              {isEditMode ? 'Update your product details' : 'Add a new textile product to the marketplace'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div
            className="rounded-2xl p-6 space-y-6"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >

            {/* ── Images ──────────────────────────────────────────── */}
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
                Product Images <span className="text-xs font-normal" style={{ color: 'var(--color-muted)' }}>({totalImages}/8)</span>
              </p>

              <div className="grid grid-cols-4 gap-3 mb-3">
                {/* Existing images */}
                {existingImgs.map((url) => (
                  <div key={url} className="relative aspect-square rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                    <img src={url} alt="" className="w-full h-full object-cover" style={{ opacity: removedImgs.includes(url) ? 0.35 : 1 }} />
                    <button
                      type="button"
                      onClick={() => toggleRemoveExisting(url)}
                      className="absolute top-1 right-1 p-1 rounded-full text-white"
                      style={{ backgroundColor: removedImgs.includes(url) ? '#16a34a' : '#ef4444' }}
                      aria-label={removedImgs.includes(url) ? 'Restore image' : 'Remove image'}
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}

                {/* New preview images */}
                {previewUrls.map((url, idx) => (
                  <div key={url} className="relative aspect-square rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(idx)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white"
                      aria-label="Remove image"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}

                {/* Upload trigger */}
                {totalImages < 8 && (
                  <label
                    className="aspect-square rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors"
                    style={{
                      border: '2px dashed var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-muted)',
                    }}
                  >
                    <Upload size={20} className="mb-1" />
                    <span className="text-xs">Add</span>
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
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                JPEG, PNG or WebP. Max 10 MB per file. Up to 8 images.
              </p>
            </div>

            {/* ── Title ─────────────────────────────────────────── */}
            <div>
              {FIELD('Title *', 'title', errors.title)}
              <input
                id="title"
                {...register('title', { required: 'Title is required', maxLength: { value: 200, message: 'Max 200 characters' } })}
                className={inputClass}
                style={inputStyle}
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
                style={inputStyle}
                rows={4}
                placeholder="Describe your fabric in detail — quality, finish, use cases…"
              />
            </div>

            {/* ── Category + Fabric ─────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                {FIELD('Category *', 'category', errors.category)}
                <select
                  id="category"
                  {...register('category', { required: 'Category is required' })}
                  className={inputClass}
                  style={inputStyle}
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
                  style={inputStyle}
                  placeholder="e.g. 100% Cotton"
                />
              </div>
            </div>

            {/* ── GSM + Color + Width ───────────────────────────── */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                {FIELD('GSM', 'gsm', errors.gsm)}
                <input
                  id="gsm"
                  type="number"
                  min={1}
                  {...register('gsm', { min: { value: 1, message: 'Min 1' } })}
                  className={inputClass}
                  style={inputStyle}
                  placeholder="e.g. 120"
                />
              </div>
              <div>
                {FIELD('Color', 'color', errors.color)}
                <input
                  id="color"
                  {...register('color')}
                  className={inputClass}
                  style={inputStyle}
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
                  style={inputStyle}
                  placeholder="e.g. 150"
                />
              </div>
            </div>

            {/* ── Price + MOQ + Stock ───────────────────────────── */}
            <div className="grid grid-cols-3 gap-4">
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
                  style={inputStyle}
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
                  style={inputStyle}
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
                  style={inputStyle}
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
                style={inputStyle}
                placeholder="e.g. premium, summer, bridal (comma separated)"
              />
            </div>

            {/* ── Listing Active toggle ─────────────────────────── */}
            {isEditMode && (
              <div className="flex items-center gap-3">
                <input
                  id="isActive"
                  type="checkbox"
                  {...register('isActive')}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: 'var(--color-brand-primary)' }}
                />
                <label htmlFor="isActive" className="text-sm font-medium cursor-pointer" style={{ color: 'var(--color-text)' }}>
                  Listing is active (visible on marketplace)
                </label>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3.5 rounded-xl font-semibold text-sm transition-opacity disabled:opacity-60"
              style={{ backgroundColor: 'var(--color-brand-primary)', color: '#ffffff' }}
            >
              {isSubmitting
                ? (isEditMode ? 'Saving…' : 'Creating…')
                : (isEditMode ? 'Save Changes' : 'Publish Product')}
            </button>
            <Link
              to="/supplier/products"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm border"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormPage;
