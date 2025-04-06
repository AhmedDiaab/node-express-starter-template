import { NextFunction, Request, Response } from "express";
import { AppError } from "@/errors";
import { ResponseSerializer } from "@/serializers";

export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof AppError) {
        const stack = err.stack!.match(/(Error: .+?\n\s+at .+)/)?.[0].replace('\n', ' ').replace('     ', ' ') || '';

        ResponseSerializer.error(res, 500, {
            timestamp: new Date().toISOString(),
            status: 'error',
            message: err.message,
            details: err.details,
            isOperational: err.isOperational,
            stack: process.env.NODE_ENV === 'development' ? stack : undefined
        });
        return;
    }

    ResponseSerializer.error(res, 500, {
        timestamp: new Date().toISOString(),
        status: 'error',
        message: 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        isOperational: true,
    });
};