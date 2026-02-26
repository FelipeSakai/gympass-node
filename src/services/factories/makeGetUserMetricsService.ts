import { PrismaCheckInsRepository } from "@/repositories/prisma/prismaCheckIn.repository.js";
import { GetUserMetrics } from "../getUserMetrics.service.js";

export function makeGetUserMetricsService() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository();
    const getUserMetricsService = new GetUserMetrics(prismaCheckInsRepository);

    return getUserMetricsService;
}
