import type { CheckIn } from "generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/checkIns.repository.js";
import type { GymsRepository } from "@/repositories/gym.repository.js";
import { ResourceNotFoundError } from "./errors/resourceNotFoundError.js";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates.js";

interface CheckInServiceRequest {
    userId: string;
    gymId: string;
    UserLatitude: number;
    UserLongitude: number;
}

interface CheckInServiceResponse {
    checkIn: CheckIn
}
export class CheckInService {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ) { }

    async execute({ userId, gymId, UserLatitude, UserLongitude }: CheckInServiceRequest): Promise<CheckInServiceResponse> {

        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: UserLatitude, longitude: UserLongitude, },
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber(), }
        )

        const MAX_DISTANCE_IN_KM = 0.1

        if (distance > MAX_DISTANCE_IN_KM) {
            throw new Error()
        }

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