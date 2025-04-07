# Node-Express Starter Template

Welcome to the **Node-Express Starter Template**, a modular and scalable foundation for building modern server-side applications using **Express** and **TypeScript**.

This starter template is thoughtfully designed with a strong emphasis on structured logging, standardized responses, error handling, and environment configuration, making it production-ready from day one.

---

## 🚀 Features

- **📦 Modular Architecture** – Clean, scalable structure suitable for growing codebases.
- **🔧 TypeScript Support** – Enjoy type safety and modern JavaScript features.
- **🌱 Multi-Environment Configuration** – Load `.env` files per environment using a utility layer.
- **🩵 Structured Logging with Pino** – High-performance and structured logs.
- **🛄 Unified Response Dispatcher** – Send consistent API responses through the `ResponseDispatcher`.
- **💥 Global Error Handling** – Catches and formats operational and unknown errors globally.
- **🧩 Middleware Pipeline** – Includes logger, response formatter, and error catcher.
- **📁 Route Auto-Assembly** – Use `RouteAssembly` utility to organize and register your routes.
- **📁 Extensible File Structure** – Follows feature-based separation for easy scaling.

---

## 📂 File Structure

```
node-express-starter-template/
├── src/
│   ├── config/              # App configuration and env loader
│   ├── controllers/         # Route logic controllers
│   ├── enums/               # Common enums (status codes, messages)
│   ├── errors/              # Custom error classes
│   ├── handlers/            # Error handler middleware
│   ├── middlewares/         # Logger, formatter, error catcher
│   ├── models/              # Database models (if any)
│   ├── routes/              # Route definitions
│   ├── serializers/         # ResponseDispatcher utility
│   ├── utils/               # Helpers and utilities
│   └── main.ts              # Application entry point
├── .env.example             # Sample environment variables
├── logs/                    # Generated application logs
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

---

## ⚙️ Environment Setup

The app uses `.env` files to configure per-environment values.

### Example: `.env.development`

```
NODE_ENV=development
APP_NAME="my-app"
PORT=3000
LOG_LEVEL=debug
LOG_FILES_DIRECTORY_NAME=logs
LOG_FILE_NAME=app.log
```

> ✅ Use `src/config/env.util.ts` to manage loading environment-specific values.

---

## 🩵 Logging

Pino is configured to provide fast, readable, and structured logs.

- Log level is customizable via the environment.
- Logs can be output to the console or files.
- Middleware automatically logs requests and responses.

---

## 🛄 Unified Response Handling

Use `ResponseDispatcher` to send all success or error responses. It helps:

- Avoid repeating boilerplate response structure.
- Ensure all responses have a `timestamp`, `status`, `message`, and optional `data`/`details`.
- Simplify middleware-based formatting for successful responses.

---

## 💥 Global Error Handling

- All thrown errors are caught and transformed into a standardized response format.
- Operational errors like `NotFoundError`, `ForbiddenError`, or custom `AppError` are formatted properly.
- Unknown/unhandled errors are caught and hidden in production.

---

## 🧪 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/AhmedDiaab/node-express-starter-template.git
cd node-express-starter-template
pnpm install  # or npm install
```

### 2. Configure Environments

Copy `.env.example` to `.env.development`, `.env.production`, etc., and customize.

### 3. Run the Server

```bash
pnpm dev  # Starts development server with nodemon
```

---

## 🛠 Customization Tips

- Add new routes in `routes/` and register them via `RouteAssembly`.
- Implement logic in `controllers/` and dispatch responses with `ResponseDispatcher`.
- Add or customize middleware in `middlewares/`.
- Define new error types in `errors/` and handle them globally.

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.

---

## 📄 License

GPL-3.0 © [Ahmed Diaab](https://github.com/AhmedDiaab)

