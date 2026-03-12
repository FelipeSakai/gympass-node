import type { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register.controller.js";
import { authenticateController } from "./controllers/authenticate.controller.js";
import { profileController } from "./controllers/profile.controller.js";
import { verifyJwt } from "./middlewares/verifyJwt.js";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);

  app.post("/sessions", authenticateController);

  app.get("/me", { onRequest: [verifyJwt] }, profileController);
}
