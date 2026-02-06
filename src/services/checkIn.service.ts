import type { CheckIn } from "generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/checkIns.repository.js";
import type { GymsRepository } from "@/repositories/gym.repository.js";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError.js";

interface CheckInServiceRequest {
    userId: string;
    gymId: string;
    UserLatitude: Number;
    UserLongitude: Number;
}

interface CheckInServiceResponse {
    checkIn: CheckIn
}
export class CheckInService {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ) { }

    async execute({ userId, gymId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {

        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }
        // if (gym.latitude && gym.longitude) {
        //     const distance = this.calculateDistance(
        //         gym.latitude,
        //         gym.longitude,
        //         UserLatitude,
        //         UserLongitude
        //     );

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