import type { UsersRepository } from "@/repositories/users.repository.js";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists.error.js";
import type { User } from "generated/prisma/browser.js";


interface RegisterServiceParams {
    name: string;
    email: string;
    password: string;
}

interface RegisterServiceResponse {
    user: User;
}
export class RegisterService {
    constructor(private usersRepository: UsersRepository) { }


    async execute({ name, email, password }: RegisterServiceParams): Promise<RegisterServiceResponse> {
        const passwordHash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.usersRepository.create({
            name,
            email,
            passwordHash
        })

        return { user }
    }

}