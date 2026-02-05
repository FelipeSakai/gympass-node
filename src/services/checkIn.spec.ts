import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/inMemoryCheckIn.repository.js";
import { CheckInService } from "./checkin.js";

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInService;

describe('CheckIn Service', () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new CheckInService(checkInRepository);
        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in', async () => {


        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })
        ).rejects.toBeInstanceOf(Error);

    })

    it('should be able to check in twice in different days', async () => {

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})