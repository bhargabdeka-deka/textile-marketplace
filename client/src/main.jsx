/**
 * src/main.jsx
 *
 * React application bootstrap.
 * Renders the root <App /> into the DOM and wraps with all top-level providers.
 * React 19 uses createRoot (no ReactDOM.render).
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import App from './App.jsx';
import './styles/globals.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Root element #root not found. Check your index.html has <div id="root">.'
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      {/* Global toast notifications — positioned top-right */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
        }}
      />
      <App />
    </BrowserRouter>
  </StrictMode>
);
