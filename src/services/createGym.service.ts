import type { GymsRepository } from "@/repositories/gym.repository.js";
import type { Gym } from "generated/prisma/client.js";


interface CreateGymServiceParams {
    tittle: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

interface CreateGymServiceResponse {
    gym: Gym;
}
export class CreateGymService {
    constructor(private gymsRepository: GymsRepository) { }


    async execute({ tittle, description, phone, latitude, longitude }: CreateGymServiceParams): Promise<CreateGymServiceResponse> {

        const gym = await this.gymsRepository.create({
            tittle,
            description,
            phone,
            latitude,
            longitude,
        })

        return { gym }
    }

}