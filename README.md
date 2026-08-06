# 🧵 TextileHub — B2B Textile Marketplace

> A production-quality MVP for connecting textile buyers and suppliers in India.

---

## 📁 Project Structure

```
textile-marketplace/
├── client/                  # React 19 + Vite frontend
│   ├── src/
│   │   ├── assets/          # Static assets (images, fonts, icons)
│   │   ├── components/
│   │   │   ├── common/      # Navbar, Footer
│   │   │   └── ui/          # Loading, Button, Card, etc.
│   │   ├── contexts/        # React Contexts (ThemeContext)
│   │   ├── hooks/           # useAuth, useApi
│   │   ├── layouts/         # AppLayout, AuthLayout
│   │   ├── pages/
│   │   │   ├── buyer/       # Buyer-only pages
│   │   │   ├── supplier/    # Supplier-only pages
│   │   │   └── common/      # Home, Login, Register, 404
│   │   ├── routes/          # ProtectedRoute guard
│   │   ├── services/        # Axios instance + API service wrappers
│   │   ├── store/           # Zustand stores (auth, cart)
│   │   ├── styles/          # globals.css (Tailwind + design tokens)
│   │   └── utils/           # Formatters, validators
│   ├── index.html
│   └── vite.config.js
│
└── server/                  # Node.js + Express + MongoDB API
    ├── config/              # db.js, corsOptions.js
    ├── controllers/         # auth, product, order, cart, user
    ├── middleware/          # errorHandler, notFound, auth, upload
    ├── models/              # User, Product, Order, Cart
    ├── routes/              # auth, product, order, cart, user routes
    ├── services/            # auth.service, product.service
    ├── uploads/             # User-uploaded files (gitignored)
    ├── utils/               # apiResponse, token
    ├── app.js               # Express app factory
    └── server.js            # HTTP server entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

```bash
# Server
cp server/.env.example server/.env
# Edit server/.env — set MONGO_URI, JWT_SECRET

# Client
cp client/.env.example client/.env
```

### 3. Run Development Servers

```bash
# Terminal 1 — API server (port 5000)
cd server
npm run dev

# Terminal 2 — React client (port 5173)
cd client
npm run dev
```

### 4. Verify

| URL | Description |
|-----|-------------|
| http://localhost:5173 | React frontend |
| http://localhost:5000/api/health | API health check |
| http://localhost:5000/api/auth/health | Auth routes test |
| http://localhost:5000/api/products/health | Product routes test |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router DOM v7 |
| Styling | Tailwind CSS v4, Framer Motion |
| State | Zustand (persisted) |
| Forms | React Hook Form |
| HTTP | Axios |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| File Uploads | Multer |

---

## 📋 Development Roadmap

### ✅ Phase 1 — Architecture (Current)
- [x] Project scaffolding (client + server)
- [x] Folder structure and placeholder files
- [x] Route configuration skeleton
- [x] Design system (CSS tokens, Tailwind)
- [x] Navbar, Footer, Loading, 404 page
- [x] Zustand stores (auth, cart)
- [x] Axios instance with interceptors
- [x] Global error handler
- [x] Landing page (Hero, Stats, Categories, CTA)

### 🔲 Phase 2 — Core Features
- [ ] JWT Authentication (register, login, logout)
- [ ] Product listing and detail pages
- [ ] Supplier product management
- [ ] Shopping cart (sync with backend)
- [ ] Order placement and tracking
- [ ] File uploads (product images)

### 🔲 Phase 3 — Polish
- [ ] AI chatbot assistant
- [ ] Advanced search and filters
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Payment gateway integration

---

## 📄 License

MIT © TextileHub Team
