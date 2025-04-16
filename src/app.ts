import express, { Application } from 'express';
import { globalErrorHandler, notFoundHandler } from '@/handlers';
import { RouteAssembly } from '@/core';
import { loggerMiddleware, responseFormatter } from '@/middlewares';
import { passportManager } from '@/modules/auth';

const app: Application = express();



// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to format json responses
app.use(responseFormatter);

// Middleware for logging
app.use(loggerMiddleware);

// Register passport
app.use(passportManager.initialize());


// Register routes
app.use("/api/v1", RouteAssembly.createRouter());

// 404 Fallback Middleware (Handles unmatched routes)
app.use(notFoundHandler); // Register the 404 handler as the last middleware

// Catch all unhandled errors and send a generic error response
app.use(globalErrorHandler);

export default app;