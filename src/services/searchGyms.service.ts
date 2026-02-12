import type { GymsRepository } from "@/repositories/gym.repository.js";
import type { Gym } from "generated/prisma/client.js";


interface SearchGymServiceParams {
    query: string
    page: number
}

interface CreateGymServiceResponse {
    gyms: Gym[];
}
export class SearchGymService {
    constructor(private gymsRepository: GymsRepository) { }


    async execute({ query, page }: SearchGymServiceParams): Promise<CreateGymServiceResponse> {

        const gyms = await this.gymsRepository.searchMany(query, page)

        return { gyms, }
    }

}