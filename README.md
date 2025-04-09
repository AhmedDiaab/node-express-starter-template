# Node-Express Starter Template

Welcome to the **Node-Express Starter Template**, a modular and scalable foundation for building modern server-side applications using **Express** and **TypeScript**.

This template is thoughtfully designed with a strong emphasis on structured logging, standardized responses, global error handling, multi-environment configuration, and database abstraction. It features production-ready configurations for Docker, seamless ORM integration (default: TypeORM), and a robust middleware pipeline—ensuring a clean, maintainable, and scalable architecture right from the start.

---

## 🚀 Features

- **📦 Modular Architecture** – Clean, scalable structure for large projects.
- **🔧 TypeScript Support** – Full type safety and modern JS features.
- **🌱 Multi-Environment Configuration** – Load `.env` files per environment.
- **🩵 Structured Logging with Pino** – Fast, readable, and structured logs.
- **🛄 Unified Response Dispatcher** – Standardized response format across the app.
- **💥 Global Error Handling** – Catch and transform all errors consistently.
- **🧩 Middleware Pipeline** – Logger, response formatter, and error catcher.
- **📁 Route Auto-Assembly** – Auto-register routes with `RouteAssembly`.
- **📁 Aliased Paths** – Use concise `@/` and `@lib/` imports via TypeScript paths.
- **🔄 Database Abstraction** – Easy-to-switch ORM support (TypeORM, Sequelize, MikroORM).
- **🐳 Docker Support** – Docker + Compose for dev & prod environments.
- **🚀 Production-Ready Code** – Lean, optimized setup for deployment.
- **🛠 Database Initialization** – Auto-create/init databases from scripts.

---

## 📂 File Structure

```
node-express-starter-template/
├── src/
│   ├── config/              # App configuration and env loader
│   ├── controllers/         # Route logic controllers
│   ├── database/            # Database client and migrations
│   ├── dispatchers/         # Response dispatchers (default: response.dispatcher.ts)
│   ├── enums/               # Common enums (status codes, messages)
│   ├── errors/              # Custom error classes
│   ├── handlers/            # Error handler middleware
│   ├── middlewares/         # Logger, formatter, error catcher
│   ├── models/              # Database models (if any)
│   ├── routes/              # Route definitions
│   ├── serializers/         # Response serializers 
│   ├── utils/               # Helpers and utilities
│   ├── app.ts               # Application assembly
│   └── server.ts            # Application entry point
├── logs/                    # Generated application logs
├── .env.example             # Sample environment variables
├── .gitignore               # Files to ignore in Git repository
├── init-db.sql              # Database initialization script
├── Dockerfile               # Dockerfile for building the image
├── docker-compose.yml       # Docker Compose file
├── .env.example             # Environment variables (example file)
├── nodemon.json             # Nodemon configuration file
├── LICENSE                  # License file
├── package.json             # Dependencies and scripts
├── pnpm-lock.yaml           # Package lock file for pnpm
├── tsconfig.json            # TypeScript configuration
└── README.md                # You’re reading this 📖 
```

---

## ⚙️ Environment Setup

Supports per-environment `.env` files. Example for development:

```
NODE_ENV="development"
APP_NAME="my-app"
PORT=3000
LOG_LEVEL="debug"
LOG_FILES_DIRECTORY_NAME="logs"
LOG_FILE_NAME="app.log"
DB_TYPE="postgres"
DB_HOST="localhost"
DB_PORT=5429
DB_USERNAME="postgres"
DB_PASSWORD="postgres"
DB_NAME="my_app"
DB_LOGGING=true
DB_SSL=false
DB_USEUTC=true
```

> 🛠 Managed by `src/utils/env.util.ts`.

---

## 🩵 Logging

Uses **Pino** for fast and structured logs.

- Console + file output support
- Middleware logs incoming requests/responses
- Log level controlled via `.env`

---

## 🛄 Unified Response Handling

The `ResponseDispatcher` provides a consistent structure for sending API responses across the application.

### ✅ Features:

- Ensures **all responses** follow a **uniform format**
- Handles both **success** and **error** responses
- Returns standard fields like `timestamp`, `status`, `message`, and `data`
- Supports optional `details` and error `stack` trace
- Designed to integrate with **serializers** for custom output (TODO: add serializers)

---

## 💥 Global Error Handling

- All errors (operational or unknown) are caught globally.
- Custom errors (e.g., `NotFoundError`, `ForbiddenError`, `AppError`) are well formatted.
- In production, sensitive error info is hidden.

---

## 📁 Aliased Imports

No more long relative imports!

- `@/` → `src/`
- `@lib/` → `lib/`

Example:

```ts
import { logger } from '@/utils/logger.util';
import { IDatabaseClient } from '@lib/database';
```

> Defined in `tsconfig.json` and supported by tooling like ESLint, Jest, etc.

---

## 🐳 Docker Support

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Run with Docker

To run the application with Docker, use the following command:

```bash
docker compose --env-file .env.development up -d --build
```

- **`.env.development`** (or `.env.production`, depending on the environment) is injected into both the app and database containers. Make sure your environment file contains the correct configurations.
- **Volume mounts & port mappings** are pre-configured, enabling the application to be accessed through the mapped ports.
- **Environment Switching**: The setup works for both development and production environments. The environment is controlled through the `.env` files:
    - `.env.development` for development mode.
    - `.env.production` for production mode.

### Notes:
- If you're in **development mode**, you can enable hot-reloading by mounting the `src` directory in the `docker-compose.yml`:
  
  ```yaml
  volumes:
    - ./src:/app/src  # Dev hot-reload (optional)
  ```
  
  This allows automatic code updates without rebuilding the container.

### Stopping the Containers

To stop the running containers, use:

```bash
docker compose down
```

This command will stop and remove the containers.

---

## 🗄 Database Abstraction

- Easily plug in TypeORM, MikroORM, Prisma, Sequelize, etc.
- Built around an interface (`IDatabaseClient`) to decouple logic from ORM.
- Default integration: **TypeORM**

Example `database-client.ts`:

```ts
import { DataSource } from 'typeorm';
import { databaseConfiguration } from '@/config';
import { logger } from '@/utils/logger.util';

class DatabaseClient {
  private _dataSource = new DataSource(databaseConfiguration);

  async connect() {
    try {
      await this._dataSource.initialize();
      logger.debug('Database connection established successfully 👌');
    } catch (error: any) {
      logger.error('Error connecting to database', error.code);
      process.exit(1);
    }
  }

  async disconnect() {
    await this._dataSource.destroy();
  }

  get dataSource() {
    return this._dataSource;
  }
}

export const databaseClient = new DatabaseClient();
```

---

## 🧪 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/AhmedDiaab/node-express-starter-template.git
cd node-express-starter-template
pnpm install
```

### 2. Configure Environment

```bash
cp .env.example .env.development
# Edit values as needed
```

### 3. Run Dev Server

```bash
pnpm dev
```

---

## 🧱 Customization Tips

- Add routes in `src/routes/` & auto-register via `RouteAssembly`.
- Write logic in `src/controllers/`, send responses via `ResponseDispatcher`.
- Customize responses in `responseFormatter` under `src/middlewares/`.
- Add new middleware under `src/middlewares/`.
- Create reusable serializers or error types as needed.

---

## 🤝 Contributing

Contributions are welcome! Submit issues, feature ideas, or PRs 🙌

---

## 📄 License

GPL-3.0 © [Ahmed Diaab](https://github.com/AhmedDiaab)

