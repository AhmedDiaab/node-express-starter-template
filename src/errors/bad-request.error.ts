import { HttpStatusCodes } from "@/enums";
import { AppError } from "./app.error";

export class BadRequestError extends AppError {
    constructor(message: string = 'Bad request') {
        super(message, HttpStatusCodes.BadRequest, 'BAD_REQUEST');
    }
}