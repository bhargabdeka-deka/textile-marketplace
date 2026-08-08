# 🧵 TextileHub — B2B Textile Marketplace & Mill Directory

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express.js-v4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Production-000000?logo=vercel&logoColor=white)](https://textile-marketplace.vercel.app)
[![Render API](https://img.shields.io/badge/Render-API%20Live-46E3B7?logo=render&logoColor=white)](https://textile-marketplace-api.onrender.com/api)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A production-ready, high-density B2B SaaS marketplace connecting textile mills, fabric suppliers, and bulk apparel buyers across India and global markets.

---

## 🌐 Live Production Deployments

- **Live Web Application (Vercel)**: [https://textile-marketplace.vercel.app](https://textile-marketplace.vercel.app)
- **Live Backend API (Render)**: [https://textile-marketplace-api.onrender.com/api](https://textile-marketplace-api.onrender.com/api)

---

## 🌟 Key Features

### 🛍️ Buyer Experience & Marketplace
- **Wholesale Fabric Directory**: Filter fabrics by GSM, weave, material composition, price per meter, minimum order quantity (MOQ), and real-time inventory stock.
- **AI Fabric Search**: Natural language query engine allowing buyers to describe target garments or fabric specs (e.g., *"breathable 200+ GSM cotton for summer shirts"*).
- **Persistent Shopping Cart & Bulk Checkout**: Role-restricted bulk procurement cart with live total calculations, sample requests, and instant order placement.
- **Order Tracking & History**: Real-time status updates (*Pending*, *Processing*, *Shipped*, *Delivered*, *Cancelled*) for buyer procurement management.

### 🏭 Supplier Portal & Management
- **Catalog Management**: Full CRUD capabilities for adding, updating, and archiving fabric listings with Cloudinary image optimizations.
- **Order Fulfillment**: Dedicated dashboard for suppliers to review incoming buyer purchase orders, update fulfillment statuses, and manage lead times.
- **Sales Analytics**: Metrics grid tracking active listings, total order volume, inventory turnover, and revenue trends.

### 🔒 Security & Performance
- **Enterprise Access Control**: Role-Based Access Control (RBAC) separating Buyer and Supplier workflows with JWT authentication and password hashing (`bcryptjs`).
- **Cloudinary Image Optimization**: Automatic WebP transformation, responsive scaling, and fast asset delivery.
- **Stripe/Shopify-Inspired UI**: Handcrafted, restrained light-theme design system built around strict 8px layout grids, high contrast text hierarchy (`#111827`), thin stroke borders (`#E5E7EB`), and zero visual noise.

---

## 🛠️ Technology Stack

| Layer | Technologies & Tools |
| :--- | :--- |
| **Frontend Core** | React 19, Vite 8, React Router DOM v7 |
| **Styling & Motion** | Tailwind CSS v4, Vanilla CSS Design System, Framer Motion |
| **State Management** | Zustand (Persisted client-side state for auth & cart) |
| **Icons & UI Utilities** | Lucide React, React Hot Toast |
| **Backend API** | Node.js 18+, Express.js |
| **Database & ORM** | MongoDB Atlas, Mongoose |
| **Auth & Security** | JSON Web Tokens (JWT), Bcrypt.js, CORS |
| **File Storage** | Cloudinary API & Local Fallback via Multer |
| **Production Hosting** | Vercel (Client SPA) & Render (Node API) |

---

## 📁 Project Structure

```text
textile-marketplace/
├── client/                      # React 19 + Vite Frontend
│   ├── src/
│   │   ├── assets/              # Logos, favicon, static images
│   │   ├── components/
│   │   │   ├── common/          # Navbar, Footer
│   │   │   └── ui/              # Button, Card, Input, Select, Badge, Skeleton, EmptyState, Loading
│   │   ├── layouts/             # AppLayout, AuthLayout
│   │   ├── pages/
│   │   │   ├── buyer/           # BuyerDashboardPage, CartPage, CheckoutPage
│   │   │   ├── supplier/        # SupplierDashboardPage, ProductFormPage, SupplierProductsPage
│   │   │   ├── info/            # AboutPage, ContactPage, BuyerGuidePage, SupplierGuidePage, Policies
│   │   │   └── common/          # HomePage, MarketplacePage, ProductDetailPage, LoginPage, RegisterPage
│   │   ├── routes/              # ProtectedRoute guard
│   │   ├── services/            # Axios instance, Auth/Product API services
│   │   ├── store/               # Zustand stores (authStore, cartStore, productStore)
│   │   └── styles/              # globals.css (Base typography & Tailwind tokens)
│   ├── index.html
│   └── vite.config.js
│
└── server/                      # Node.js + Express Backend API
    ├── config/                  # Database connection, CORS settings
    ├── controllers/             # Auth, Product, Order, Cart, User controllers
    ├── middleware/              # Authentication, Error handling, File upload
    ├── models/                  # Mongoose schemas (User, Product, Order, Cart)
    ├── routes/                  # API routes (auth, product, order, cart, user, ai)
    ├── services/                # Business logic services
    ├── utils/                   # Standardized API response formatters
    ├── app.js                   # Express application setup
    └── server.js                # Server entry point
```

---

## 🚀 Deployment & Environment Setup

### 1. Repository Setup

```bash
# Clone the repository
git clone https://github.com/bhargabdeka-deka/textile-marketplace.git
cd textile-marketplace
```

### 2. Backend Environment (`server/.env`)

```bash
cd server
npm install
```

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/textile-marketplace
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Environment (`client/.env`)

```bash
cd client
npm install
```

```env
VITE_API_URL=https://textile-marketplace-api.onrender.com/api
```

### 🌐 Live Production Access
- **Live Frontend App (Vercel)**: [https://textile-marketplace.vercel.app](https://textile-marketplace.vercel.app)
- **Live Production API (Render)**: [https://textile-marketplace-api.onrender.com/api](https://textile-marketplace-api.onrender.com/api)

---

## 📡 API Endpoint Overview

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new account (Buyer or Supplier)
- `POST /api/auth/login` — Authenticate user and receive JWT token
- `GET /api/auth/me` — Retrieve current authenticated user profile

### 📦 Products (`/api/products`)
- `GET /api/products` — Browse products with search, filter, and pagination parameters
- `GET /api/products/:id` — Retrieve detailed fabric specification
- `POST /api/products` — Create fabric listing *(Supplier only)*
- `PUT /api/products/:id` — Update fabric details *(Supplier only)*
- `DELETE /api/products/:id` — Archive product listing *(Supplier only)*

### 🤖 AI Engine (`/api/ai`)
- `POST /api/ai/search` — Execute natural language query for fabric matching

### 🛒 Cart & Orders (`/api/cart`, `/api/orders`)
- `GET /api/cart` — Fetch buyer cart items
- `POST /api/cart` — Add item to cart
- `POST /api/orders` — Submit bulk purchase order
- `GET /api/orders` — Fetch buyer or supplier order history

---

## 🛠️ Verification & Build Commands

```bash
# Verify client production build
cd client
npm run build

# Run server in production mode
cd server
npm start
```

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
