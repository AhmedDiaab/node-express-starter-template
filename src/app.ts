import express, { Application } from 'express';
import { notFoundHandler } from '@/handlers';
import { RouteAssembly } from '@/utils';
import { loggerMiddleware } from './middlewares';
const app: Application = express();



// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for logging
app.use(loggerMiddleware);

// Register routes
app.use("/api/v1", RouteAssembly.createRouter());

// 404 Fallback Middleware (Handles unmatched routes)
app.use(notFoundHandler); // Register the 404 handler as the last middleware

export default app;