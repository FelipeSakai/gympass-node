import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/inMemoryCheckIn.repository.js";
import { CheckInService } from "./checkIn.service.js";
import { InMemoryGymRepository } from "@/repositories/in-memory/inMemoryGym.repository.js";
import { Decimal } from "@prisma/client/runtime/index-browser";
import { MaxNumbersOfCheckInsError } from "./errors/maxNumbersOfCheckIns.error.js";
import { MaxDistanceError } from "./errors/maxDistance.error.js";

let checkInRepository: InMemoryCheckInsRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInService;
describe('CheckIn Service', () => {

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        gymRepository = new InMemoryGymRepository();
        sut = new CheckInService(checkInRepository, gymRepository);

        await gymRepository.create({
            id: 'gym-01',
            tittle: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: -27.2092052,
            longitude: -49.6401091,
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

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            UserLatitude: -27.2092052,
            UserLongitude: -49.6401091,
        })
        ).rejects.toBeInstanceOf(MaxNumbersOfCheckInsError);

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


    it('should not be able to check in on distant gym', async () => {

        gymRepository.items.push({
            id: 'gym-02',
            tittle: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-27.4092052),
            longitude: new Decimal(-49.0001091),
        })


        await expect(() =>
            sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                UserLatitude: -27.2092052,
                UserLongitude: -49.6401091,
            }),
        ).rejects.toBeInstanceOf(MaxDistanceError);
    })

})