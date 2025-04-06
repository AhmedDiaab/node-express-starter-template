import { HttpStatusCodes } from "@/enums";
import { AppError } from "./app.error";

export class ForbiddenError extends AppError {
    constructor(message: string = 'You do not have permission to access this resource') {
        super(message, HttpStatusCodes.Forbidden, 'FORBIDDEN');
    }
}