import { prisma } from "@/lib/prisma.js";
import type { UsersRepository } from "@/repositories/users.repository.js";
import { hash } from "bcryptjs";


interface RegisterServiceParams {
    name: string;
    email: string;
    password: string;
}

export class RegisterService {
    constructor(private usersRepository: UsersRepository) { }


    async execute({ name, email, password }: RegisterServiceParams) {
        const passwordHash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new Error("Email already exists.");
        }

        await this.usersRepository.create({
            name,
            email,
            passwordHash
        })
    }

}