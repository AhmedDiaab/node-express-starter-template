import { AppError } from './app.error';
import { HttpStatusCodes } from '@/enums';

export class InternalServerError extends AppError {
    constructor(message: string = 'An unexpected error occurred') {
        super(message, HttpStatusCodes.InternalServerError, 'INTERNAL_SERVER_ERROR');
    }
}