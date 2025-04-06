import { HttpStatusCodes } from '@/enums';
import { Response } from 'express';

export type ResponseStatusText = 'success' | 'error';

export interface ResponseData<T> {
    timestamp: string;
    status: ResponseStatusText;
    message?: string | undefined;
    data?: T | undefined;
    details?: unknown | undefined;
}

export interface ErrorDetails<T> extends Pick<ResponseData<T>, 'timestamp' | 'status' | 'message' | 'details'> {
    stack?: string;
    isOperational: boolean;
}

export class ResponseDispatcher {
    static success<T>(res: Response, statusCode: HttpStatusCodes, data: ResponseData<T>) {
        res.status(statusCode).json(data);
    }

    static error<T>(res: Response, statusCode: HttpStatusCodes, errorResponse: ErrorDetails<T>) {
        res.status(statusCode).json(errorResponse);
    }
}
