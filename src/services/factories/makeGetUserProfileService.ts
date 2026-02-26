import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsers.repository.js";
import { GetUserProfileService } from "../getUserProfile.service.js";

export function makeGetUserProfileService() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserProfileService = new GetUserProfileService(prismaUsersRepository);

    return getUserProfileService;
}
