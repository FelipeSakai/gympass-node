import { PrismaGymRepository } from "@/repositories/prisma/prismaGym.repository.js";
import { SearchGymService } from "../searchGyms.service.js";

export function makeSearchGymsService() {
    const prismaGymRepository = new PrismaGymRepository();
    const searchGymService = new SearchGymService(prismaGymRepository);

    return searchGymService;
}
