import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/inMemoryCheckIn.repository.js";
import { ValidateCheckInService } from "./validateCheckIn.service.js";
import { ResourceNotFoundError } from "./errors/resourceNotFound.error.js";

let checkInRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInService;
describe('Validate CheckIn Service', () => {

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInService(checkInRepository);

        // vi.useFakeTimers();
    })

    afterEach(() => {
        // vi.useRealTimers();
    })

    it('should be able to validate the check in', async () => {
        const createdCheckIn = await checkInRepository.create({
            gymId: 'gym-01',
            user_id: 'user-01',
        })
        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id,
        })
        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect(checkInRepository.items[0]?.validated_at).toEqual(expect.any(Date));
    })

    it('should be able to validate an inexistent check in', async () => {
        await expect(() => sut.execute({
            checkInId: 'inexistent-check-in-id',
        })).rejects.toBeInstanceOf(ResourceNotFoundError);
    })


})





