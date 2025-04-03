import express, { Application } from 'express';
import { RouteAssembly } from './utils';
const app: Application = express();



// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use("/api/v1", RouteAssembly.createRouter());

export default app;