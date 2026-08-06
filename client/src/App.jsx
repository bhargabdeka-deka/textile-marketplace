/**
 * src/App.jsx
 *
 * Root application component.
 * Defines the full route tree for the TextileHub marketplace.
 *
 * Route groups:
 *  /              — Public pages wrapped in AppLayout (Navbar + Footer)
 *  /auth/*        — Auth pages wrapped in AuthLayout (centered card)
 *  /buyer/*       — Buyer-only protected pages
 *  /supplier/*    — Supplier-only protected pages
 */

import { Routes, Route } from 'react-router-dom';

// Layouts
import AppLayout  from '@/layouts/AppLayout.jsx';
import AuthLayout from '@/layouts/AuthLayout.jsx';

// Route guards
import ProtectedRoute from '@/routes/ProtectedRoute.jsx';

// ── Public pages ──────────────────────────────────────────────────────────────
import HomePage          from '@/pages/common/HomePage.jsx';
import NotFoundPage      from '@/pages/common/NotFoundPage.jsx';
import MarketplacePage   from '@/pages/common/MarketplacePage.jsx';
import ProductDetailPage from '@/pages/common/ProductDetailPage.jsx';

// ── Info & Policy pages ───────────────────────────────────────────────────────
import AboutPage from '@/pages/info/AboutPage.jsx';
import ContactPage from '@/pages/info/ContactPage.jsx';
import BlogPage from '@/pages/info/BlogPage.jsx';
import CareersPage from '@/pages/info/CareersPage.jsx';
import SuppliersPage from '@/pages/info/SuppliersPage.jsx';
import CategoriesPage from '@/pages/info/CategoriesPage.jsx';
import BulkOrdersPage from '@/pages/info/BulkOrdersPage.jsx';
import HelpCenterPage from '@/pages/info/HelpCenterPage.jsx';
import BuyerGuidePage from '@/pages/info/BuyerGuidePage.jsx';
import SupplierGuidePage from '@/pages/info/SupplierGuidePage.jsx';
import ReturnsPolicyPage from '@/pages/info/ReturnsPolicyPage.jsx';
import PrivacyPolicyPage from '@/pages/info/PrivacyPolicyPage.jsx';
import TermsOfServicePage from '@/pages/info/TermsOfServicePage.jsx';
import CookiePolicyPage from '@/pages/info/CookiePolicyPage.jsx';

// ── Auth pages ────────────────────────────────────────────────────────────────
import LoginPage    from '@/pages/common/LoginPage.jsx';
import RegisterPage from '@/pages/common/RegisterPage.jsx';

// ── Buyer pages ───────────────────────────────────────────────────────────────
import BuyerDashboardPage from '@/pages/buyer/BuyerDashboardPage.jsx';
import CartPage           from '@/pages/buyer/CartPage.jsx';
import CheckoutPage       from '@/pages/buyer/CheckoutPage.jsx';

// ── Supplier pages ────────────────────────────────────────────────────────────
import SupplierDashboardPage from '@/pages/supplier/SupplierDashboardPage.jsx';
import SupplierProductsPage  from '@/pages/supplier/SupplierProductsPage.jsx';
import ProductFormPage       from '@/pages/supplier/ProductFormPage.jsx';

function App() {
  return (
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
  );
}

export default App;
