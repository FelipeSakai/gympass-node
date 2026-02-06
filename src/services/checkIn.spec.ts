import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/inMemoryCheckIn.repository.js";
import { CheckInService } from "./checkIn.service.js";
import { InMemoryGymRepository } from "@/repositories/in-memory/inMemoryGym.repository.js";
import { Decimal } from "@prisma/client/runtime/index-browser";

let checkInRepository: InMemoryCheckInsRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInService;
describe('CheckIn Service', () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository();
        gymRepository = new InMemoryGymRepository();
        sut = new CheckInService(checkInRepository, gymRepository);

        gymRepository.items.push({
            id: 'gym-01',
            tittle: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-27.2092052),
            longitude: new Decimal(-49.6401091),
        })

        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in', async () => {

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            UserLatitude: -27.2092052,
            UserLongitude: -49.6401091,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            UserLatitude: -27.2092052,
            UserLongitude: -49.6401091,
        })

        expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            UserLatitude: -27.2092052,
            UserLongitude: -49.6401091,
        })
        ).rejects.toBeInstanceOf(Error);

    })

    it('should be able to check in twice in different days', async () => {

        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            UserLatitude: -27.2092052,
            UserLongitude: -49.6401091,
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            UserLatitude: -27.2092052,
            UserLongitude: -49.6401091,
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})