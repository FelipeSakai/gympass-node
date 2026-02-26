import { PrismaCheckInsRepository } from "@/repositories/prisma/prismaCheckIn.repository.js";
import { PrismaGymRepository } from "@/repositories/prisma/prismaGym.repository.js";
import { CheckInService } from "../checkIn.service.js";

export function makeCheckInService() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository();
    const prismaGymsRepository = new PrismaGymRepository();
    const checkInService = new CheckInService(
        prismaCheckInsRepository,
        prismaGymsRepository
    );

    return checkInService;
}
