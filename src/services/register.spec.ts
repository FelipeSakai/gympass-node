import { expect, describe, it, beforeEach } from "vitest";
import { RegisterService } from "./register.service.js";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/inMemoryUser.repository.js";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists.error.js";

let userRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe('Register Service', () => {
    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new RegisterService(userRepository);
    })

    it('should hash user password upon registration', async () => {

        const { user } = await sut.execute({
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

        const email = 'john.doe@example.com'

        await sut.execute({
            name: 'John Doe',
            email,
            password: 'password123'
        })

        await expect(() => sut.execute({
            name: 'John Doe',
            email,
            password: 'password123'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);

    })
})