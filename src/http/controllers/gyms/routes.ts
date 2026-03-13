import { verifyJwt } from "@/http/middlewares/verifyJwt.js";
import type { FastifyInstance } from "fastify";
import { nearbyController } from "./nearby.controller.js";
import { searchController } from "./search.controller.js";
import { createController } from "./create.controller.js";

export async function gymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/gyms/search", searchController);
  app.get("/gyms/nearby", nearbyController);
  app.post("/gyms", createController);
}
