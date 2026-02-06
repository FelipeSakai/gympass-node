import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/inMemoryUser.repository.js";
import { AuthenticateService } from "./authenticate.service.js";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalidCredentialError.js";

let userRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe('Authenticate Service', () => {

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new AuthenticateService(userRepository);
    })

    it('should be able to authenticate a user', async () => {


        await userRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            passwordHash: await hash('password123', 6)
        });

        const { user } = await sut.execute({
            email: 'john.doe@example.com',
            password: 'password123'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateService(userRepository);

        await expect(() => sut.execute({
            email: 'john.doe@example.com',
            password: '123456'
        }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    })

    it('should not be able to authenticate with wrong password', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new AuthenticateService(userRepository);

        await userRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            passwordHash: await hash('password123', 6)
        });

        await expect(() => sut.execute({
            email: 'john.doe@example.com',
            password: 'wrongpassword'
        }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    })

})