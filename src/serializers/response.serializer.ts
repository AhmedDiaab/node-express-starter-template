import { Response } from 'express';

export class ResponseSerializer {
    static success(res: Response, data: any) {
        const successResponse = {
            success: true,
            data,
            timestamp: new Date().toISOString()
        };
        res.json(successResponse);
    }

    static error(res: Response, error: any) {
        const errorResponse = {
            success: false,
            message: error.message || 'Something went wrong',
            details: error.details || null,
            timestamp: new Date().toISOString()
        };
        res.status(error.statusCode || 500).json(errorResponse);
    }
}
