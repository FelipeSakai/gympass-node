import { verifyJwt } from "@/http/middlewares/verifyJwt.js";
import type { FastifyInstance } from "fastify";
import { createController } from "./create.controller.js";
import { validateController } from "./validate.controller.js";
import { metricsController } from "./metrics.controller.js";
import { historyController } from "./history.controller.js";
import { verifyUserRole } from "@/http/middlewares/verifyUserRole.js";
import {
  checkInHistorySchema,
  checkInMetricsSchema,
  createCheckInSchema,
  validateCheckInSchema,
} from "@/docs/schemas.js";

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post(
    "/gyms/:gymId/checkIns",
    { onRequest: [verifyUserRole("ADMIN")], schema: createCheckInSchema },
    createController,
  );
  app.patch(
    "/checkIns/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")], schema: validateCheckInSchema },
    validateController,
  );
  app.get(
    "/checkIns/metrics",
    { schema: checkInMetricsSchema },
    metricsController,
  );
  app.get(
    "/checkIns/history",
    { schema: checkInHistorySchema },
    historyController,
  );
}
