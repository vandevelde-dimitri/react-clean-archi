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

## 🔧 CLI: `create-feature`

Quickly generate a new feature folder with the required structure and starter files.

### Usage

```bash
npx create-feature myFeature [--public | --private]
```

-   `myFeature`: The name of your new feature (camelCase or kebab-case)
-   `--private`: Injects the route under the private route section
-   `--public`: Injects the route under the public route section
-   If neither flag is passed, the CLI will prompt you

### What it does:

-   Creates `src/features/myFeature/` with:
    -   `components/`, `data/`, `hooks/`, `pages/`, `services/`, `store/`, `types/`
-   Adds mock data (`Faker`)
-   Generates a sample page, hooks, service
-   Injects import and `<Route />` into `AppRoutes.tsx` (private or public)

### Example:

```bash
npx create-feature user --private
```

➡️ Generates the full folder and adds:

```tsx
<Route path="/user" element={<UserPage />} />
```

in your router under the private section.

---

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
