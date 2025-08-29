# 🧰 Backend Boilerplate (Express.js + Node.js + TypeScript)

A scalable and modular backend boilerplate built with **Express.js**, **TypeScript**, **Prisma**, and **modular aliases** — designed for rapid development and production-ready deployment.

---

## 🚀 Features

- ⚙️ **Express.js** – Lightweight web framework
- 🔐 **TypeScript** – Strictly typed and maintainable
- 🎯 **Prisma ORM** – Modern and type-safe database access
- 📦 **Module Aliasing** – Clean import paths using `@` prefix
- 🛡 **Middleware-based Structure** – Easily extensible and readable
- 📁 **Modular Folder Structure** – Scales with your application
- 📄 **Zod** – Schema validation for request bodies
- 🔐 **JWT Authentication** – Pre-configured token-based auth
- 📨 **Nodemailer** – Email support ready to use
- 🌍 **CORS + Dotenv** – Environment-friendly configuration
- 🔄 **Live Reload** with `nodemon` + `ts-node`
- 1️⃣ **Status Codes** - Predefined enum to access code number by code name
- 📚 **Swagger Documentation** - Automatic API documentation

---

## 📁 Folder Structure

```
src/
├── configs/         # Environment and app-level configurations
├── controllers/     # Route controllers
├── middlewares/     # Custom Express middlewares
├── routes/          # API route declarations
├── services/        # Business logic and service abstraction
├── utils/           # Reusable helper functions
├── types/           # TypeScript interfaces and enums
├── helpers/         # Misc helpers (hashing, tokens, etc.)
└── server.ts        # Entry point of the application
```

---

## 🛠 Tech Stack

| Tech        | Description                    |
|-------------|--------------------------------|
| Express     | Web server framework           |
| TypeScript  | Superset of JavaScript         |
| Prisma      | ORM for SQL databases          |
| MySQL2      | Database driver (for Prisma)   |
| JWT         | Auth tokens                    |
| Zod         | Schema validation              |
| Nodemailer  | Email sending support          |
| Swagger     | API Documentation              |

---

## 📦 Installation

```bash
git clone https://github.com/MadurangaDev/express-boilerplate.git
cd express-boilerplate

# Install dependencies
npm install
```

---

## ⚙️ Setup

### 1. Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=5000
DATABASE_URL="mysql://user:password@localhost:3306/your_db"
JWT_SECRET="your_jwt_secret"
```

### 2. Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

(Optional) Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

---

## 🧪 Development

Run in watch mode:

```bash
npm run dev
```

Compile TypeScript:

```bash
npm run build
```

Start production build:

```bash
npm start
```

---

## 🔗 API Example

A working test route is available at:

```
GET /
```

Response:
```json
{
  "body": "welcome to API",
  "message": "API is running"
}
```

---

## 🔧 Module Aliases

Module paths are defined using `tsconfig.json` and `_moduleAliases`:

```ts
import { StatusCodes } from "@enums";
import { createResponse } from "@utils";
import { authRouter } from "@routes";
```

---

## 📑 Scripts

| Script       | Description                     |
|--------------|---------------------------------|
| `npm run dev`| Start development server        |
| `npm run build` | Compile TypeScript into JS |
| `npm start`  | Run compiled app from `dist/`   |

---

## ✍️ Author

- **Shehan Maduranga** – [GitHub](https://github.com/MadurangaDev)

---

## 🧪 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

