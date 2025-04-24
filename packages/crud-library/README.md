# 📚 CRUD Library
---

## 🧩 `jeet-kiit-crud` — API-Key Protected CRUD Client

[![npm](https://img.shields.io/npm/v/jeet-kiit-crud?color=%2300b894&label=npm%20package)](https://www.npmjs.com/package/jeet-kiit-crud)
[![License](https://img.shields.io/npm/l/jeet-kiit-crud?color=blue)](LICENSE)
[![Build](https://img.shields.io/badge/build-passed-brightgreen)](#)
[![Made by Jeet](https://img.shields.io/badge/made%20by-jeet%20rout-%23e84393)](https://github.com/jeet-rout)

> 🔐 A secure, API-key-based CRUD client for use with FormPilot or custom backend APIs.  
> Built with TypeScript, Axios, and fully Postgres-ready.

---

### 📦 Install

```bash
npm install jeet-kiit-crud
```

---

### ⚙️ Setup

```ts
import { CrudLibrary } from "jeet-kiit-crud";

// You should retrieve these from sessionStorage, login response, or env
const crud = CrudLibrary({
  apiKey: "your-api-key-here",
  apiUrl: "https://your-crud-domain.com/api",
});
```

---

### 🚀 Available Methods

| Method              | Description                           |
|---------------------|---------------------------------------|
| `create(data)`      | Create a new record                   |
| `get(id)`           | Fetch a single record                 |
| `getAll()`          | Fetch all records                     |
| `update(id, data)`  | Update a record                       |
| `remove(id)`        | Delete a record                       |
| `getCredits()`      | Check current credit usage            |
| `getCreditLimit()`  | Check current credit limit            |
| `recharge()`        | Recharge credits via backend approval |

---

### 🧠 Example

```ts
const res = await crud.create({
  value: "Learn NPM packages!",
  txHash: "0x123abc",
});

console.log(res.id); // -> New record ID

const all = await crud.getAll();
console.log(all);
```

---

### 🔐 Authentication

All requests include the `x-api-key` header.  
Each user has a limited number of credits (default: 4), and they can call `recharge()` once for an extra 4 credits.

---

### 🧪 Use Cases

- ⚡ Intern assignment projects
- 🧾 Billing or credit-tracked APIs
- 🔐 Secure public access to APIs
- 🧱 Shared API client across frontend apps

---

### 👨‍💻 Author

Made with 💙 by [**Jeet Das**](https://github.com/JeetDas5)

---

### 📄 License

This project is licensed under the [MIT License](LICENSE).

---

### ⭐ Like it?

Give it a ⭐ on [GitHub](https://github.com/JeetDas5)  
And tag me if you use it in your own project!

---

