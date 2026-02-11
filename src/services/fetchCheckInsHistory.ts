import type { CheckIn } from "generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/checkIns.repository.js";

interface fetchCheckInsHistoryRequest {
    userId: string;
    page: number;
}

interface fetchCheckInsHistoryResponse {
    checkIns: CheckIn[];
}
export class fetchCheckInsHistory {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) { }

    async execute({ userId, page }: fetchCheckInsHistoryRequest): Promise<fetchCheckInsHistoryResponse> {

        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

        return { checkIns }
    }
}