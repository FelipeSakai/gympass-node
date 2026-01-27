import type { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register.js";

export async function appRoutes(app: FastifyInstance) {

    app.post("/users", registerController)

}