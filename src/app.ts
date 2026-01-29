import fastify from "fastify";
import { appRoutes } from "./http/routes.js";
import { ZodError } from "zod/v3";
import { env } from "./env/index.js";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: "Validation error",
            issues: error.format()
        });
    }

    if (env.NODE_ENV !== "production") {
        console.error(error);
    } else {
        // TODO
    }

    return reply.status(500).send({
        message: "Internal server error"
    });
});