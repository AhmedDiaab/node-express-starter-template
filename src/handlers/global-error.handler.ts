import { NextFunction, Request, Response } from "express";
import { AppError } from "@/errors";
import { ResponseDispatcher } from "@/dispatchers";
import { HttpStatusCodes } from "@/enums";

export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof AppError) {
        const stack = err.stack?.split('\n').slice(0, 2).map(line => line.trim()).join(' ') || '';

        ResponseDispatcher.error(res, err.statusCode, {
            timestamp: new Date().toISOString(),
            status: 'error',
            message: err.message,
            details: err.details,
            isOperational: err.isOperational,
            stack: process.env.NODE_ENV === 'development' ? stack : undefined
        });
        return;
    }

    ResponseDispatcher.error(res, HttpStatusCodes.InternalServerError, {
        timestamp: new Date().toISOString(),
        status: 'error',
        message: 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        isOperational: true,
    });
};