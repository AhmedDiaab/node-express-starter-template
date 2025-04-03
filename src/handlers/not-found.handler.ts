import { Request, Response } from 'express';

/**
 * This middleware function handles requests to non-existent routes.
 * It is the final middleware in the stack, ensuring that unmatched routes
 * return a 404 status code and a clear error message.
 * 
 * @param req - The incoming request object
 * @param res - The outgoing response object
 * @param next - The next middleware function (not used in this case)
 */
function notFoundHandler(req: Request, res: Response): void {
    res.status(404).json({ message: "Route not found" });
};

export { notFoundHandler };
