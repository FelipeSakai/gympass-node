import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/inMemoryUser.repository.js";
import { hash } from "bcryptjs";
import { GetUserProfileService } from "./getUserProfle.js";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError.js";

let userRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe('GetUserProfile Service', () => {

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileService(userRepository);
    })

    it('should be able to get a user profile', async () => {


        const createdUser = await userRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            passwordHash: await hash('password123', 6)
        });

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')
    })


    it('should not be able to get user profile with invalid userId', async () => {
        const userRepository = new InMemoryUsersRepository();
        const sut = new GetUserProfileService(userRepository);

        await expect(() => sut.execute({
            userId: 'invalid-id',
        }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    })
})