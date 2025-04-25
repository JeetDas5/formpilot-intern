# Formpilot Todo App

This is a simple Todo App built with Next.js 15 (App Router) and Prisma, designed to be used as a demo for the CRUD platform. It features authentication via Google and a simple API key flow for usage tracking.

A todo app is a web application that allows users to create, manage their tasks, and track their progress. It typically includes features such as adding, editing, deleting. The app is built using Next.js 15 (App Router) and Prisma, which provides a powerful and flexible way to interact with the database.

## Live Demo

🌐 [https://formpilot-intern-todo-app.vercel.app](https://formpilot-intern-todo-app.vercel.app)

## Features

- ✅ Google OAuth authentication (`next-auth`)
- 🔑 API key generation per user
- 📦 NPM package ready for external integrations
- 📊 Request limit logic (4 credits per user by default)
- 💌 Recharge credits by sending an email request(currently clicking button will do the job)
- 🌐 Shared Postgres DB via Prisma + Neon + Turborepo

## Project Structure

```
apps/
  └── todo-app/     ← This web app
packages/
    ├── database/          ← Shared Prisma client + schema
    ├── typescript-config/ ← Shared tsconfig

```
    
## Tech Stack

- **Next.js 15 (App Router)**
- **PostgreSQL + Prisma (via Neon DB)**
- **Tailwind CSS**
- **NextAuth.js**
- **Turborepo (monorepo architecture)**
- **Vercel (for deployment)**

## Auth & API Key Flow
1. User logs in with Google
2. An API key and usage URL are generated and shown
3. Each request consumes 1 credit (max 4 by default)
4. When exhausted, user must send an email to recharge(click recharge button)
5. User can also click the button to recharge credits


## 📄 License

MIT

---

## 👨‍💻 Author

Made with ❤️ by **Jeet Das**  
FormPilot Internship Task – 2025

---