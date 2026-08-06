/**
 * src/pages/supplier/SupplierProductsPage.jsx
 *
 * Supplier product management page — lists all own products
 * with options to create, edit, and delete.
 *
 * Replaces the placeholder SupplierDashboardPage widget area
 * with a real, functional product management UI.
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import useProductStore from '@/store/productStore';
import ProductCard from '@/components/ui/ProductCard';
import Loading from '@/components/ui/Loading';

function DeleteModal({ product, onConfirm, onCancel, isDeleting }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6"
        style={{ backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-xl)' }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: '#fef2f2' }}
        >
          <AlertTriangle size={24} style={{ color: '#dc2626' }} />
        </div>
        <h3
          className="text-lg font-bold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
        >
          Delete Product
        </h3>
        <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
          Are you sure you want to delete{' '}
          <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
            "{product.title}"
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl font-semibold text-sm transition-opacity disabled:opacity-60"
            style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl font-semibold text-sm border"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function SupplierProductsPage() {
  const {
    myProducts, myProductsLoading, myProductsTotal,
    myProductsPage, fetchMyProducts, deleteProduct,
  } = useProductStore();

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting,   setIsDeleting]   = useState(false);

  useEffect(() => {
    fetchMyProducts(1);
  }, [fetchMyProducts]);

  const handleEdit = (product) => {
    // Navigation handled via Link in the ProductCard — this is for direct calls
    window.location.href = `/supplier/products/${product._id}/edit`;
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteProduct(deleteTarget._id);
      toast.success('Product deleted successfully');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh' }}>
      {deleteTarget && (
        <DeleteModal
          product={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1
              className="text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              My Products
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>
              {myProductsTotal} listing{myProductsTotal !== 1 ? 's' : ''} in your catalogue
            </p>
          </div>
          <Link
            to="/supplier/products/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--color-brand-primary)', color: '#ffffff' }}
          >
            <Plus size={16} />
            Add Product
          </Link>
        </div>

        {/* Content */}
        {myProductsLoading ? (
          <Loading message="Loading your products…" />
        ) : myProducts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center rounded-2xl"
            style={{ border: '2px dashed var(--color-border)', backgroundColor: 'var(--color-surface)' }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ backgroundColor: 'var(--color-brand-accent)' }}
            >
              <Package size={30} style={{ color: 'var(--color-brand-primary)' }} />
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              No products yet
            </h3>
            <p className="text-sm mb-6 max-w-xs" style={{ color: 'var(--color-muted)' }}>
              Start by creating your first product listing to appear on the marketplace.
            </p>
            <Link
              to="/supplier/products/new"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              style={{ backgroundColor: 'var(--color-brand-primary)', color: '#ffffff' }}
            >
              <Plus size={16} />
              Create First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {myProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                showActions
                onEdit={() => { window.location.href = `/supplier/products/${product._id}/edit`; }}
                onDelete={(p) => setDeleteTarget(p)}
              />
            ))}
          </div>
        )}

        {/* Load more */}
        {myProducts.length < myProductsTotal && !myProductsLoading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => fetchMyProducts(myProductsPage + 1)}
              className="px-8 py-3 rounded-xl font-semibold text-sm border transition-colors"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupplierProductsPage;
