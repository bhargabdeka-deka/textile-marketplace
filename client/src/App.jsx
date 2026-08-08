/**
 * src/App.jsx
 *
 * Root application component.
 * Defines the full route tree for the TextileHub marketplace.
 * 
 * Optimized for maximum LCP performance and Google Search indexing:
 * - HomePage is statically imported for instant < 300ms initial paint.
 * - Secondary pages remain lazily loaded.
 */

import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import AppLayout  from '@/layouts/AppLayout.jsx';
import AuthLayout from '@/layouts/AuthLayout.jsx';

// Route guards
import ProtectedRoute from '@/routes/ProtectedRoute.jsx';

// Global loading fallback
import Loading from '@/components/ui/Loading';

// ── Static Import for Immediate LCP Initial Paint (< 300ms) ───────────────────
import HomePage from '@/pages/common/HomePage.jsx';

// ── Automatic Scroll-to-Top Helper ─────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// ── Lazy-loaded Public & Secondary Pages ──────────────────────────────────────
const NotFoundPage      = lazy(() => import('@/pages/common/NotFoundPage.jsx'));
const MarketplacePage   = lazy(() => import('@/pages/common/MarketplacePage.jsx'));
const ProductDetailPage = lazy(() => import('@/pages/common/ProductDetailPage.jsx'));

// ── Lazy-loaded Info & Policy Pages ───────────────────────────────────────────
const AboutPage            = lazy(() => import('@/pages/info/AboutPage.jsx'));
const ContactPage          = lazy(() => import('@/pages/info/ContactPage.jsx'));
const BlogPage             = lazy(() => import('@/pages/info/BlogPage.jsx'));
const CareersPage          = lazy(() => import('@/pages/info/CareersPage.jsx'));
const SuppliersPage        = lazy(() => import('@/pages/info/SuppliersPage.jsx'));
const CategoriesPage       = lazy(() => import('@/pages/info/CategoriesPage.jsx'));
const BulkOrdersPage       = lazy(() => import('@/pages/info/BulkOrdersPage.jsx'));
const HelpCenterPage       = lazy(() => import('@/pages/info/HelpCenterPage.jsx'));
const BuyerGuidePage       = lazy(() => import('@/pages/info/BuyerGuidePage.jsx'));
const SupplierGuidePage    = lazy(() => import('@/pages/info/SupplierGuidePage.jsx'));
const ReturnsPolicyPage    = lazy(() => import('@/pages/info/ReturnsPolicyPage.jsx'));
const PrivacyPolicyPage    = lazy(() => import('@/pages/info/PrivacyPolicyPage.jsx'));
const TermsOfServicePage   = lazy(() => import('@/pages/info/TermsOfServicePage.jsx'));
const CookiePolicyPage     = lazy(() => import('@/pages/info/CookiePolicyPage.jsx'));

// ── Lazy-loaded Auth Pages ───────────────────────────────────────────────────
const LoginPage    = lazy(() => import('@/pages/common/LoginPage.jsx'));
const RegisterPage = lazy(() => import('@/pages/common/RegisterPage.jsx'));

// ── Lazy-loaded Buyer Pages ──────────────────────────────────────────────────
const BuyerDashboardPage = lazy(() => import('@/pages/buyer/BuyerDashboardPage.jsx'));
const CartPage           = lazy(() => import('@/pages/buyer/CartPage.jsx'));
const CheckoutPage       = lazy(() => import('@/pages/buyer/CheckoutPage.jsx'));

// ── Lazy-loaded Supplier Pages ───────────────────────────────────────────────
const SupplierDashboardPage = lazy(() => import('@/pages/supplier/SupplierDashboardPage.jsx'));
const SupplierProductsPage  = lazy(() => import('@/pages/supplier/SupplierProductsPage.jsx'));
const ProductFormPage       = lazy(() => import('@/pages/supplier/ProductFormPage.jsx'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loading variant="page" message="Accessing console secure routes..." />}>
        <Routes>
          {/* ── Public Routes (Navbar + Footer) ────────────────────────── */}
          <Route element={<AppLayout />}>
            <Route index          element={<HomePage />} />
            <Route path="/products"    element={<MarketplacePage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            
            {/* Info & Policy Routes */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/bulk-orders" element={<BulkOrdersPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="/buyer-guide" element={<BuyerGuidePage />} />
            <Route path="/supplier-guide" element={<SupplierGuidePage />} />
            <Route path="/returns" element={<ReturnsPolicyPage />} />
            <Route path="/returns-policy" element={<ReturnsPolicyPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/cookies" element={<CookiePolicyPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          </Route>

          {/* ── Auth Routes (centered layout) ──────────────────────────── */}
          <Route element={<AuthLayout />}>
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* ── Buyer Protected Routes ──────────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
            <Route element={<AppLayout />}>
              <Route path="/buyer/dashboard" element={<BuyerDashboardPage />} />
              <Route path="/buyer/cart"      element={<CartPage />} />
              <Route path="/buyer/checkout"  element={<CheckoutPage />} />
            </Route>
          </Route>

          {/* ── Supplier Protected Routes ───────────────────────────────── */}
          <Route element={<ProtectedRoute allowedRoles={['supplier']} />}>
            <Route element={<AppLayout />}>
              <Route path="/supplier/dashboard"          element={<SupplierDashboardPage />} />
              <Route path="/supplier/products"           element={<SupplierProductsPage />} />
              <Route path="/supplier/products/new"       element={<ProductFormPage />} />
              <Route path="/supplier/products/:id/edit"  element={<ProductFormPage />} />
            </Route>
          </Route>

          {/* ── 404 ─────────────────────────────────────────────────────── */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
