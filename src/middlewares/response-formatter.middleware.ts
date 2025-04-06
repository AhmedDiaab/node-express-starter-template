import { ResponseDispatcher } from '@/dispatchers';
import { Request, Response, NextFunction } from 'express';

export function responseFormatter(req: Request, res: Response, next: NextFunction) {
    const json = res.json;

    res.json = function (body) {
        // If response already formatted (e.g., error handler), skip
        if (body?.status === 'error' || body?.status === 'success') {
            return json.call(this, body);
        }

        // Override json method to format response
        ResponseDispatcher.success(res, 200, {
            timestamp: new Date().toISOString(),
            status: 'success',
            message: 'Request successful',
            data: body,
        });
        return res;
    };

    next();
}
