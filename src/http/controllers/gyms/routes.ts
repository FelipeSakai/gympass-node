import { verifyJwt } from "@/http/middlewares/verifyJwt.js";
import type { FastifyInstance } from "fastify";
import { nearbyController } from "./nearby.controller.js";
import { searchController } from "./search.controller.js";
import { createController } from "./create.controller.js";
import { verifyUserRole } from "@/http/middlewares/verifyUserRole.js";
import {
  createGymSchema,
  nearbyGymsSchema,
  searchGymsSchema,
} from "@/docs/schemas.js";

export async function gymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/gyms/search", { schema: searchGymsSchema }, searchController);
  app.get("/gyms/nearby", { schema: nearbyGymsSchema }, nearbyController);
  app.post(
    "/gyms",
    { onRequest: [verifyUserRole("ADMIN")], schema: createGymSchema },
    createController,
  );
}
