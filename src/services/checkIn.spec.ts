import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/inMemoryUser.repository.js";
import { hash } from "bcryptjs";
import { GetUserProfileService } from "./getUserProfle.js";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError.js";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/inMemoryCheckIn.repository.js";
import { CheckInService } from "./checkin.js";

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe('CheckIn Service', () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new CheckInService(checkInRepository);
    })

    it('should be able to check in', async () => {


        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})