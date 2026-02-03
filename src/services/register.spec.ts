import { expect, describe, it } from "vitest";
import { RegisterService } from "./register.service.js";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/inMemoryUser.repository.js";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists.error.js";

describe('Register Service', () => {
    it('should hash user password upon registration', async () => {
        const userRepository = new InMemoryUsersRepository();
        const registerService = new RegisterService(userRepository);

        const { user } = await registerService.execute({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123'
        })

        const isPasswordHashed = await compare(
            'password123',
            user.passwordHash
        )

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to register with same email twice', async () => {
        const userRepository = new InMemoryUsersRepository();
        const registerService = new RegisterService(userRepository);


        const email = 'john.doe@example.com'

        await registerService.execute({
            name: 'John Doe',
            email,
            password: 'password123'
        })

        await expect(() => registerService.execute({
            name: 'John Doe',
            email,
            password: 'password123'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);

    })
})