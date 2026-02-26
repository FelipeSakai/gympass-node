import { PrismaGymRepository } from "@/repositories/prisma/prismaGym.repository.js";
import { CreateGymService } from "../createGym.service.js";

export function makeCreateGymService() {
    const prismaGymRepository = new PrismaGymRepository();
    const createGymService = new CreateGymService(prismaGymRepository);

    return createGymService;
}
