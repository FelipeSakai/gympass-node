import type { CheckIn } from "generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/checkIns.repository.js";

interface GetUserMetricsRequest {
    userId: string;
}

interface GetUserMetricsResponse {
    checkInsCount: number;
}

export class GetUserMetrics {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) { }

    async execute({ userId }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId);

        return { checkInsCount }
    }
}