# FormPilot Monorepo

This is a monorepo for the FormPilot , which includes a custom NPM package for CRUD operations with credit-limited APIs.

## 📦 Package

The package is located in the `packages/crub-library` directory. It is designed to work with a secure backend powered by PostgreSQL, Prisma, and Next.js.
The package provides a simple and efficient way to perform CRUD operations with credit-limited APIs.
The package is built with TypeScript and Axios, making it easy to use and integrate into any frontend or CLI application.

---


# 🧩 jeet-kiit-crud

A lightweight, developer-friendly **NPM package** for performing **CRUD operations** with credit-limited APIs — built for the FormPilot Internship assignment.
Designed to work with a secure backend powered by **PostgreSQL, Prisma, and Next.js**.

## 📖 Table of Content

- [🧩 jeet-kiit-crud](#-jeet-kiit-crud)
  - [📖 Table of Content](#-table-of-content)
  - [✨ Features](#-features)
  - [📦 Installation](#-installation)
  - [🛠 Setup](#-setup)
  - [🚀 Usage](#-usage)
    - [🔹 Create a todo](#-create-a-todo)
    - [🔹 Get a todo](#-get-a-todo)
    - [🔹 Update a todo](#-update-a-todo)
    - [🔹 Delete a todo](#-delete-a-todo)
    - [🔹 Get all todos for the current user](#-get-all-todos-for-the-current-user)
    - [🔹 Get credit usage](#-get-credit-usage)
  - [🧪 Backend API (Next.js)](#-backend-api-nextjs)
  - [💡 Credit Limits](#credit-limits)
  - [🧱 Tech Stack](#tech-stack)
  - [📌 Author](#author)
  - [📜 License](#license)
---

## ✨ Features

- ✅ Create, Read, Update, Delete operations
- 🔐 API Key–protected requests
- 🔋 Credit-limited usage per user
- 🧾 Works with any frontend or CLI via this package
- 🧰 Built with Axios + TypeScript

---

## 📦 Installation

```bash
npm install jeet-kiit-crud (Not published yet! Use local path instead)
```


---

## 🛠 Setup

Create a `.env` file in the root of your project using the package:

```env
NEXT_PUBLIC_CRUD_API_URL=http://localhost:3000/api
NEXT_PUBLIC_CRUD_API_KEY=your-api-key
```

---

## 🚀 Usage

```ts
import * as Crublibrary from "jeet-kiit-crud";
```

### 🔹 Create a todo

```ts
const res = await Crublibrary.create({ value: "Learn AI", txHash: "0xabc123" });
// → { id: "clx...", status: "created successfully" }
```

---

### 🔹 Get a todo

```ts
const todo = await Crublibrary.get("clx123...");
console.log(todo.value, todo.txHash);
```

---

### 🔹 Update a todo

```ts
await Crublibrary.update("clx123...", { value: "Updated value" });
```

---

### 🔹 Delete a todo

```ts
await Crublibrary.remove("clx123...");
```

---

### 🔹 Get all todos for the current user

```ts
const allTodos = await Crublibrary.getAll();
console.log(allTodos);
```

---

### 🔹 Get credit usage

```ts
const creditInfo = await Crublibrary.getCredits();
console.log(`Used: ${creditInfo.requestCount}/${creditInfo.requestLimit}`);
```

---

## 🧪 Backend API (Next.js)

These routes power the NPM package:

| Endpoint       | Method | Description      |
| -------------- | ------ | ---------------- |
| `/api/create`  | POST   | Create new todo  |
| `/api/:id`     | GET    | Fetch one        |
| `/api/:id`     | PUT    | Update todo      |
| `/api/:id`     | DELETE | Delete todo      |
| `/api/all`     | GET    | Get all todos    |
| `/api/credits` | GET    | Get credit usage |

> All requests must include header:
> `x-api-key: YOUR_API_KEY`

---

## 💡 Credit Limits

Each user is given 4 credits (requests).  
Once limit is reached, further API calls will be blocked until recharge.

---

## 🧱 Tech Stack

- Frontend: Next.js (App Router), Tailwind CSS
- Backend: Next.js API routes, Prisma, PostgreSQL
- Auth: Google OAuth via NextAuth.js
- Package: Axios + TypeScript + Custom NPM package
- Infra: Monorepo via Turborepo

---

## 📌 Author

Made with ❤️ by [Jeet Das](https://github.com/JeetDas5) — KIIT University  
FormPilot Internship Task, 2025


---

### ✅ Optional:
- You can rename `jeet-kiit-crud` → `formpilot-crud` before publishing to NPM
- Push this `README.md` in both:
  - `packages/crublibrary/`
  - And your main GitHub repo root (if you want project-wide instructions)

Let me know if you'd like a logo banner, deploy instructions, or contributor section added!

