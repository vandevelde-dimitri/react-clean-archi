# 🧱 Create React Clean Archi

A modern and clean React starter powered by Vite, following the Clean Architecture principles. Includes authentication, routing guards, data mocking, TanStack Query, Zustand, and Axios.

---

## 🚀 Quick Start

```bash
npx create-react-clean-archi my-app
cd my-app
npm install
npm run dev
```

---

## 📁 Project Structure

```bash
src/
├── app/         # App root composition (Router, Providers)
├── features/    # Feature-based modules (e.g. user, auth)
│   └── user/
│       ├── components/
│       ├── services/
│       ├── types/
│       ├── data/       # Mock data (used with VITE_USE_FAKE_API)
├── shared/      # Shared logic (e.g. useApi, UI, utils)
├── hooks/       # Custom hooks
├── guards/      # Route guards (PrivateRoute, PublicRoute)
```

---

## 🔐 Authentication

-   Token-based authentication with `AuthContext`

-   Stores tokens in `localStorage`

-   Handles 401 / 500 errors globally

-   Auto-refresh of access token with refresh token

-   `logoutUser()` function clears session and redirects

---

## 🌐 API Layer

-   Powered by Axios

-   Built-in auth token injection

-   Handles auto-refresh on 401 responses

-   Toggle between real API and mocks:

```env
VITE_USE_FAKE_API=true
```

Useful for offline development or simulating data.

---

## 🧪 Mock Data

Example: `features/user/data/mockUsers.ts`

Enable mock mode in `.env`:

```env
VITE_USE_FAKE_API=true
```

When active, services like `getAllUsers` will return fake data instead of real API responses.

---

## ⚡ Tech Stack

-   ⚛️ React (Vite)

-   🎯 TypeScript

-   📡 Axios

-   🔐 AuthContext + localStorage

-   🚦 React Router v6 + route guards

-   📦 Zustand (global state)

-   📊 TanStack Query (async data)

-   🎭 Faker.js (mock mode)

---

## 🧠 Design Principles

-   Feature-first structure (Clean Architecture)

-   Decoupled services

-   Mock vs. real API based on environment

-   Minimal, maintainable, and scalable

---

## 🛠 Configuration

Create a `.env` file in your root:

```env
VITE_API_BASE_URL=https://api.example.com/
VITE_USE_FAKE_API=false
```

---

## 🛠 CLI Feature Generator

Built-in CLI to generate or delete features.

### ✅ Create a Feature

```bash
npx create-feature user
```

Creates:

```pgsql
src/features/user/
├── components/
├── pages/
├── services/
├── store/
├── types/
├── hooks/
└── data/
```

Also:

-   Adds a sample `UserPage`

-   Registers the route in `AppRoutes.tsx`

-   Prompts for public/private route (or use flag)

-   Generates mock, hooks, service boilerplate

Use with flags:

```bash
npx create-feature user --private
npx create-feature profile --public
```

### 🗑️ Delete a Feature

To delete a feature:

```bash
npx create-feature user --delete
```

Will:

Delete the `src/features/user/` folder

⚠️ You must manually remove route + import from `AppRoutes.tsx`

---

## 🧰 Available Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Build the app
npm run preview   # Preview production build
```

---

## 📄 License

MIT — © Dimitri Vandevelde
