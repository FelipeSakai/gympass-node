import { verifyJwt } from "@/http/middlewares/verifyJwt.js";
import type { FastifyInstance } from "fastify";
import { createController } from "./create.controller.js";
import { validateController } from "./validate.controller.js";
import { metricsController } from "./metrics.controller.js";
import { historyController } from "./history.controller.js";

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms/:gymId/checkIns", createController);
  app.patch("/checkIns/:checkInId/validate", validateController);
  app.get("/checkIns/metrics", metricsController);
  app.get("/checkIns/history", historyController);
}
