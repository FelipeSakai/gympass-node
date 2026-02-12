import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/inMemoryCheckIn.repository.js";

import { fetchCheckInsHistory } from "./fetchCheckInsHistory.service.js";

let checkInRepository: InMemoryCheckInsRepository;
let sut: fetchCheckInsHistory;
describe('Fetch Check-Ins History Service', () => {

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new fetchCheckInsHistory(checkInRepository);


    })

    it('should be able to fetch check-ins history', async () => {

        await checkInRepository.create({
            gymId: 'gym-01',
            user_id: 'user-01',
        })

        await checkInRepository.create({
            gymId: 'gym-02',
            user_id: 'user-01',
        })

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1,
        })

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gymId: 'gym-01', user_id: 'user-01' }),
            expect.objectContaining({ gymId: 'gym-02', user_id: 'user-01' }),
        ])
    })

    it('should be able to fetch paginated check-ins history', async () => {

        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gymId: `gym-${i}`,
                user_id: 'user-01',
            })
        }

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 2,
        })

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gymId: 'gym-21', user_id: 'user-01' }),
            expect.objectContaining({ gymId: 'gym-22', user_id: 'user-01' }),
        ])
    })

})