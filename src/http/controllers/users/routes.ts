import type { FastifyInstance } from "fastify";
import { registerController } from "./register.controller.js";
import { authenticateController } from "./authenticate.controller.js";
import { profileController } from "./profile.controller.js";
import { verifyJwt } from "../../middlewares/verifyJwt.js";
import { refreshController } from "./refresh.controller.js";
import {
  authenticateSchema,
  profileSchema,
  refreshTokenSchema,
  registerUserSchema,
} from "@/docs/schemas.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", { schema: registerUserSchema }, registerController);
  app.post("/sessions", { schema: authenticateSchema }, authenticateController);

  app.patch(
    "/token/refresh",
    { schema: refreshTokenSchema },
    refreshController,
  );

  app.get(
    "/me",
    { onRequest: [verifyJwt], schema: profileSchema },
    profileController,
  );
}
