import { PrismaGymRepository } from "@/repositories/prisma/prismaGym.repository.js";
import { FetchNearByGymsService } from "../fetchNearByGyms.service.js";

export function makeFetchNearByGymsService() {
    const prismaGymRepository = new PrismaGymRepository();
    const fetchNearByGymsService = new FetchNearByGymsService(prismaGymRepository);

    return fetchNearByGymsService;
}
