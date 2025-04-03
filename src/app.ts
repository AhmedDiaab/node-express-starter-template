import express, { Application } from 'express';
import { RouteAssembly } from '@/utils';
import { notFoundHandler } from '@/handlers';
const app: Application = express();



// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use("/api/v1", RouteAssembly.createRouter());

// 404 Fallback Middleware (Handles unmatched routes)
app.use(notFoundHandler); // Register the 404 handler as the last middleware

export default app;