export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    details?: unknown;

    constructor(message: string, statusCode: number, details?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Operational errors
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}