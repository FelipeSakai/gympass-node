import type { CheckIn } from "generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/checkIns.repository.js";

interface CheckInServiceRequest {
    userId: string;
    gymId: string;
}

interface CheckInServiceResponse {
    checkIn: CheckIn
}
export class CheckInService {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
            userId, new Date

        );

        if (checkInOnSameDate) {
            throw new Error('User has already checked in today.');
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gymId: gymId,
        });

        return { checkIn };
    }
}