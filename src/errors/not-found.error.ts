import { HttpStatusCodes } from "@/enums";
import { AppError } from "./app.error";

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, HttpStatusCodes.NotFound, 'NOT_FOUND');
    }
}