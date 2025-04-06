import { AppError } from "@/errors";
import { NextFunction, Request, Response } from "express";

export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        let stack = err.stack!.match(/(Error: .+?\n\s+at .+)/)?.[0].replace('\n', ' '). replace('     ', ' ') || '';
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            details: err.details,
            isOperational: err.isOperational,
            stack: process.env.NODE_ENV === 'development' ? stack : undefined
        });
        return;
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};