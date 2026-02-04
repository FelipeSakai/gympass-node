import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsers.repository.js";
import { RegisterService } from "../register.service.js";

export function makeRegisterService() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(prismaUsersRepository);

    return registerService;
}