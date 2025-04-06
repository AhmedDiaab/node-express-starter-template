# Node-Express Starter Template

Welcome to the **Node-Express Starter Template** — a flexible and modular foundation for building modern Express applications using **TypeScript**. This template provides a clean structure, essential utilities, and integrations to accelerate the development of your project.

## Features

- **Modern Structure**: Built with TypeScript and based on best practices.
- **Express Integration**: Preconfigured to handle routes, middleware, and error handling.
- **Pino Logger**: Integrated for structured and efficient logging.
- **Response Serialization**: Utilize `ResponseSerializer` for consistent and standardized response formatting.
- **Custom Error Handling**: Built-in error handlers for common issues like Forbidden, NotFound, and Internal Server Errors.
- **Middleware Functions**: Includes logging (`loggerMiddleware`) and response formatting (`responseFormatter`).
- **Environment Variable Management**: Manage environment settings with `envUtil.ts` for multi-environment setups.
- **Route Assembly**: Easily register routes with `RouteAssembly.registerRoute()` in `src/handlers/index.ts`.
- **Global Error Handling**: Includes a global error handler to catch unhandled errors across the application.

## Getting Started

### Prerequisites

Ensure the following are installed:
- Node.js (`v14.x` or higher)
- npm (or Yarn) as your package manager

### Installation

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd node-express-starter-template
   ```

2. **Install dependencies**:
   ```sh
   npm install  # Or use `yarn install` if preferred
   ```

3. **Set up environment variables**:
   Create `.env` files for different environments (development, production, etc.). The `.env` files are managed with `envUtil.ts`.

4. **Create necessary directories**:
   ```sh
   mkdir -p src/controllers src/routes src/models
   ```

5. **Register routes**:
   Use `RouteAssembly.registerRoute()` in `src/handlers/index.ts` to register controllers.

6. **Run the application**:
   ```sh
   npm start  # Or use `yarn start` if preferred
   ```

7. **Extend as needed**:
   Customize controllers, routes, and error handling to fit your application.

## File Structure

```
node-express-starter-template/
├── src/
│   ├── enums/               # Enums for status codes, error messages, etc.
│   ├── errors/              # Custom error classes
│   ├── handlers/            # Global & route-specific error handlers
│   ├── middlewares/         # Middleware functions (logging, formatting)
│   ├── models/              # Data models (if needed)
│   ├── dispatchers/         # Custom response dispatchers
│   ├── utils/               # Utility functions & classes
│   ├── config/              # Configuration files
│   ├── controllers/         # Application logic & routes
│   ├── routes/              # Route definitions
│   └── main.ts              # Application entry point
├── .env                     # Environment variables
├── package.json             # Project dependencies & scripts
└── README.md                # Documentation
```

## Features Breakdown

### Multi-Environment Setup
- **Purpose**: The application supports multiple environments (development, production, staging, etc.), allowing you to have different configuration settings for each environment.
- **How It Works**: Environment variables are managed using `.env` files. The `envUtil.ts` utility is responsible for loading the appropriate environment variables depending on the `NODE_ENV`. This ensures that each environment (development, production, etc.) can have its own distinct settings for database connections, logging levels, application settings, and more.
- **Example**:
    - `.env.development`: For development environment settings like enabling verbose logging.
    - `.env.production`: For production settings like disabling verbose logs and connecting to production databases.

### Structured Logging
- **Purpose**: Logging is essential for debugging, monitoring, and tracing issues in production applications. The system is designed to log events and errors in a structured manner, making it easy to analyze and filter logs.
- **How It Works**: The application uses **Pino**, a fast and low-overhead logging library, for structured logging. Logs are written to both the console and log files based on configurations set in `.env` files (e.g., `LOG_LEVEL`, `LOG_FILES_DIRECTORY_NAME`, `LOG_FILE_NAME`).
    - **Pino** provides a structured, JSON-based format, allowing logs to be parsed easily by log aggregation tools (like **Grafana Loki**).
    - Logs are tagged with contextual information, such as request details and status codes, making troubleshooting more efficient.

### Unified Response Handling
- **Purpose**: To provide consistent and predictable responses for API endpoints, ensuring the frontend can easily handle both success and error cases.
- **How It Works**: The `ResponseSerializer` class is responsible for formatting and dispatching responses. It ensures that both success and error responses are structured in a unified way, making them easy to process on the frontend.
    - **Success Responses**: Data is returned in a standard format, containing information like a timestamp, status (`success`), and any relevant data.
    - **Error Responses**: When an error occurs, an error response is returned, which contains details like a timestamp, error status (`error`), a message, and additional details (such as error stack and whether the error is operational).
    - This consistency is achieved using the `responseFormatter` middleware to handle success responses and the `globalErrorHandler` for error cases.

### Global Error Handling
- **Purpose**: To ensure all errors are caught and properly formatted, providing a consistent error response format for the API.
- **How It Works**: A global error handler is implemented to catch any unhandled errors that occur within the application. This handler formats errors in a standardized manner, which can then be sent to the client.
    - **Custom Error Classes**: The application uses custom error classes like `AppError`, which can include extra details such as HTTP status codes and operational flags.
    - **Specific Error Handling**: Certain errors (like `Forbidden`, `NotFound`, `InternalServerError`) are handled with tailored responses to give more clarity to the client.
    - **Centralized Error Handling**: All errors are caught in a single place, ensuring that no unhandled exceptions disrupt the application.

### Response Dispatcher
- **Purpose**: To ensure that responses sent to the client are structured consistently.
- **How It Works**: The `ResponseSerializer` class centralizes the logic for formatting success and error responses.
    - **Success Response**: Standardizes responses with the fields `timestamp`, `status` (`success`), `message`, `data`, and `details`.
    - **Error Response**: Standardizes error responses with the fields `timestamp`, `status` (`error`), `message`, `details`, `stack`, and `isOperational`. This ensures that even errors from different parts of the system have a predictable format.
    - This dispatcher ensures that response handling is not scattered throughout different parts of the code, making it easier to maintain and extend.

### Custom Error Handling
- **Purpose**: To provide custom error responses for specific issues that might arise in the application, allowing for a more informative response to the client.
- **How It Works**: 
    - Custom errors are defined as instances of specific error classes (e.g., `AppError`), which can extend basic error handling.
    - These error classes can include additional fields like `statusCode`, `isOperational` (whether the error is expected or unexpected), and a `stack` trace for debugging purposes.
    - When an error is thrown, it is processed by the global error handler, which formats the response and sends it to the client in a structured format.

### Middleware Functions
- **Purpose**: Middleware functions help handle common concerns across the application, such as logging requests and formatting responses.
- **How It Works**: The application includes several important middleware functions:
    - **`loggerMiddleware`**: Logs details of each incoming request, including the request method, URL, status code, and response time.
    - **`responseFormatter`**: Formats successful responses, ensuring that all responses are sent in a consistent structure.
    - **Error Handlers**: Includes custom error middleware to format and send error responses.

### Environment Variable Management
- **Purpose**: To simplify the management of different configurations across environments.
- **How It Works**: The application uses the `envUtil.ts` utility to load environment variables, making it easy to define environment-specific configurations. This ensures that the application can be easily configured for different environments (e.g., development, production, staging).
    - The `.env` files are loaded based on the `NODE_ENV` setting, making it easy to toggle between environments.
    - Example settings include API keys, database connections, logging levels, and more.

### Route Assembly
- **Purpose**: To make route registration in the application more modular and organized.
- **How It Works**: The `RouteAssembly` utility simplifies the process of registering routes for different controllers. This utility abstracts the route registration logic, making it easy to add or remove routes.
    - Routes can be registered dynamically using `RouteAssembly.registerRoute()` in `src/handlers/index.ts`, allowing for a clean and scalable route management system.

---

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
