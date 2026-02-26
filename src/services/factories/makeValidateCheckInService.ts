import { PrismaCheckInsRepository } from "@/repositories/prisma/prismaCheckIn.repository.js";
import { ValidateCheckInService } from "../validateCheckIn.service.js";

export function makeValidateCheckInService() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository();
    const validateCheckInService = new ValidateCheckInService(prismaCheckInsRepository);

    return validateCheckInService;
}
