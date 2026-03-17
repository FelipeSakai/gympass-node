import type { FastifyInstance } from "fastify";
import { registerController } from "./register.controller.js";
import { authenticateController } from "./authenticate.controller.js";
import { profileController } from "./profile.controller.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
import { refreshController } from "./refresh.controller.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);

  app.patch("/token/refresh", refreshController);

  app.get("/me", { onRequest: [verifyJwt] }, profileController);
}
