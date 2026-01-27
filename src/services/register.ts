import { prisma } from "@/lib/prisma.js";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js";
import { hash } from "bcryptjs";


interface RegisterServiceParams {
    name: string;
    email: string;
    password: string;
}

export async function registerService({ name, email, password }: RegisterServiceParams) {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (userWithSameEmail) {
        throw new Error('Email already in use.');
    }

    const prismaUsersRepository = new PrismaUsersRepository();

    prismaUsersRepository.create({
        name,
        email,
        passwordHash,
    })
}