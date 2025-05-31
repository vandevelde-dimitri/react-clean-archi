# `create-react-clean-archi`

A modern and opinionated React starter based on **Clean Architecture** principles. Includes **Vite**, **Zustand**, **TanStack Query**, **Axios**, mock mode support via **Faker**, and an integrated **authentication context**.

## ✨ Features

-   ⚡️ Vite for ultra-fast development
-   🏗 Clean architecture (feature-based, scalable)
-   📦 Zustand for state management
-   🔍 TanStack Query for data fetching
-   🌐 Axios + centralized API wrapper
-   🔐 Auth context (with login, logout, auth state)
-   🧪 Mock mode via Faker (toggle via env variable)
-   🧱 CLI to create new features in seconds

---

## 🚀 Getting Started

### 1. Scaffold a new project

```bash
npx create-react-clean-archi my-app
cd my-app
```

### 2. Start the development server

```bash
npm install
npm run dev
```

---

## 🧰 Project Structure

```
src/
├── app/               # Application setup (router, providers, etc.)
├── auth/              # Authentication context
├── features/          # Feature folders (domain-specific)
│   └── example/
│       ├── components/
│       ├── data/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── store/
│       └── types/
├── shared/            # Reusable logic: api, ui, hooks, etc.
└── main.tsx
```

---

## 🧪 Mock Mode

Enable mock data by setting the following in your `.env` file:

```
VITE_USE_FAKE_API=true
```

When enabled, services will return data from Faker-based mocks instead of real API calls.

---

## 🛠 CLI Feature Generator

You can use the built-in CLI tool to generate or delete features.

### ✅ Create a feature

```
create-feature user
```

This creates the folder structure:

```
src/features/user/
├── components/
├── pages/
├── services/
├── store/
├── types/
├── hooks/
└── data/
```

It will also:

-   Add a `UserPage` in `pages/`
-   Register the route automatically in `AppRoutes.tsx`
-   Ask whether it should be a public or private route
-   Add mock data, services, and React Query hooks

You can skip the prompt with:

```
create-feature user --private
create-feature profile --public
```

### 🗑️ Delete a feature

To delete a feature:

```
create-feature user --delete
```

This will:

Delete the src/features/user/ folder

Remove related route and import from AppRoutes.tsx

## 📦 Dependencies

-   [React](https://react.dev)
-   [Vite](https://vitejs.dev/)
-   [Zustand](https://zustand-demo.pmnd.rs/)
-   [TanStack Query](https://tanstack.com/query/latest)
-   [Axios](https://axios-http.com/)
-   [Faker](https://fakerjs.dev/)
-   [React Router](https://reactrouter.com/)

---

## 📄 License

MIT — © [Dimitri Vandevelde](https://github.com/your-username)
