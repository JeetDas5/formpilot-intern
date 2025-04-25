# FormPilot CRUD Platform

A full-stack web application where users can:

- 🔐 Authenticate using Google
- 🔑 Generate secure API keys
- ⚡ Track API usage (credits)
- 📨 Recharge credits via email flow
- 🚀 Integrate with an external TODO app via a published NPM package

This is the core platform behind the FormPilot internship task.

---

## 🔗 Live Demo

🌐 [https://formpilot-intern-crud-platform.vercel.app](https://formpilot-intern-crud-platform.vercel.app)

---

## 🧠 Features

- ✅ Google OAuth authentication (`next-auth`)
- 🔑 API key generation per user
- 📦 NPM package ready for external integrations
- 📊 Request limit logic (4 credits per user by default)
- 💌 Recharge credits by sending an email request
- 🌐 Shared Postgres DB via Prisma + Neon + Turborepo

---

## 📁 Project Structure

```
apps/
  └── crud-platform/     ← This web app
packages/
  ├── database/          ← Shared Prisma client + schema
  ├── typescript-config/ ← Shared tsconfig
```

---

## 🧪 Tech Stack

- **Next.js 14 (App Router)**
- **PostgreSQL + Prisma (via Neon DB)**
- **Tailwind CSS**
- **NextAuth.js**
- **Turborepo (monorepo architecture)**
- **Vercel (for deployment)**

---

## 🔐 Auth & API Key Flow

1. User logs in with Google
2. An API key and usage URL are generated and shown
3. Each request consumes 1 credit (max 4 by default)
4. When exhausted, user must send an email to recharge(click recharge button)

---

## 📦 Integrations

Used by the following:

- 🔗 **Todo App:** [https://formpilot-intern-todo-app.vercel.app](https://formpilot-intern-todo-app.vercel.app)
- 📦 **NPM Client Library:** [`jeet-kiit-crud`](https://www.npmjs.com/package/jeet-kiit-crud)

---

## 🚀 Local Development

```bash
npm install
npm run dev
```

Add the required environment variables in `.env`:

```env
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>
NEXTAUTH_SECRET=<YOUR_NEXTAUTH_SECRET>
NEXT_PUBLIC_NEXTAUTH_URL=<YOUR_NEXTAUTH_URL>
NEXT_PUBLIC_NEXTAUTH_TODO_URL=<YOUR_NEXTAUTH_TODO_URL>
DATABASE_URL=<YOUR_DATABASE_URL>
```

---

## 📄 License

MIT

---

## 👨‍💻 Author

Made with ❤️ by **Jeet Das**  
FormPilot Internship Task – 2025

---
