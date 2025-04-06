import { HttpStatusCodes } from "@/enums";
import { AppError } from "./app.error";

export class ValidationError extends AppError {
    constructor(message: string = 'Validation failed') {
        super(message, HttpStatusCodes.BadRequest, 'VALIDATION_FAILED');
    }
}
