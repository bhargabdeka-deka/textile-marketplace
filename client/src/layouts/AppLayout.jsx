/**
 * src/layouts/AppLayout.jsx
 *
 * Main application layout — wraps all public and authenticated pages.
 * Structure: Navbar → <Outlet /> (page content) → Footer + AiAssistantWidget
 */

import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar.jsx';
import Footer from '@/components/common/Footer.jsx';
import AiAssistantWidget from '@/components/common/AiAssistantWidget.jsx';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] font-sans antialiased text-[#44403C] relative">
      {/* Fixed top navigation */}
      <Navbar />

      {/* Page content — grows to fill available space */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <Footer />

      {/* Floating AI Sourcing Assistant Widget */}
      <AiAssistantWidget />
    </div>
  );
}

export default AppLayout;
