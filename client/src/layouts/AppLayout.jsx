/**
 * src/layouts/AppLayout.jsx
 *
 * Main application layout — wraps all public and authenticated pages.
 * Structure: Navbar → <Outlet /> (page content) → Footer
 *
 * Uses React Router's <Outlet /> to render the matched child route.
 */

import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar.jsx';
import Footer from '@/components/common/Footer.jsx';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Fixed top navigation */}
      <Navbar />

      {/* Page content — grows to fill available space */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}

export default AppLayout;
