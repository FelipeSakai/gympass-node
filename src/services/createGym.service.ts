import type { GymsRepository } from "@/repositories/gym.repository.js";
import type { Gym } from "generated/prisma/client.js";


interface CreateGymServiceParams {
    title: string;
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


    async execute({ title, description, phone, latitude, longitude }: CreateGymServiceParams): Promise<CreateGymServiceResponse> {

        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude,
        })
        return { gym }
    }

}