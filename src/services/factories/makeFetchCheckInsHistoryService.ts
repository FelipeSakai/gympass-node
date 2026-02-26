import { PrismaCheckInsRepository } from "@/repositories/prisma/prismaCheckIn.repository.js";
import { fetchCheckInsHistory } from "../fetchCheckInsHistory.service.js";

export function makeFetchCheckInsHistoryService() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository();
    const fetchCheckInsHistoryService = new fetchCheckInsHistory(prismaCheckInsRepository);

    return fetchCheckInsHistoryService;
}
