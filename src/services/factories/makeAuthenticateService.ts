import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsers.repository.js";
import { AuthenticateService } from "../authenticate.js";

export function makeAuthenticateService() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateService = new AuthenticateService(prismaUsersRepository);

    return authenticateService;
}