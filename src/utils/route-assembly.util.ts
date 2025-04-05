import { Router } from "express";
import { logger } from "@/utils/logger.util";

export class RouteAssembly {
    private static routes: Router[] = [];
    private static router = Router();

    /**
     * Add a new router to the assembly
     * @param route Express Router instance
     */
    static registerRoute(route: Router): void {
        RouteAssembly.routes.push(route);
    }

    /**
     * Assemble and return the registered routes
     * @returns The assembled Express Router
     */
    static createRouter(): Router {
        RouteAssembly.routes.forEach(route => {
            RouteAssembly.router.use(route);
        });

        logger.debug("Routes have been successfully assembled 👌 👌 👌");
        return RouteAssembly.router;
    }
}
