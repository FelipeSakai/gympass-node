import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/inMemoryCheckIn.repository.js";

import { GetUserMetrics } from "./getUserMetrics.service.js";

let checkInRepository: InMemoryCheckInsRepository;
let sut: GetUserMetrics;
describe('Get User Metrics Use Case', () => {

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new GetUserMetrics(checkInRepository);


    })

    it('should be able to fetch get check-ins count from metrics', async () => {

        await checkInRepository.create({
            gymId: 'gym-01',
            user_id: 'user-01',
        })

        await checkInRepository.create({
            gymId: 'gym-02',
            user_id: 'user-01',
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2);
    })


})