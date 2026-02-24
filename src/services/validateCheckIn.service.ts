import type { CheckIn } from "generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/checkIns.repository.js";
import { ResourceNotFoundError } from "./errors/resourceNotFound.error.js";

interface ValidateCheckInServiceRequest {
    checkInId: string;
}

interface ValidateCheckInServiceResponse {
    checkIn: CheckIn
}
export class ValidateCheckInService {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) { }

    async execute({ checkInId }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {

        const checkIn = await this.checkInsRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError();
        }

        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return { checkIn };
    }
}