import type { GymsRepository } from "@/repositories/gym.repository.js";
import type { Gym } from "generated/prisma/client.js";


interface FetchNearByGymsServiceParams {
    userLatitude: number;
    userLongitude: number;
}

interface FetchNearByGymsServiceResponse {
    gyms: Gym[];
}
export class FetchNearByGymsService {
    constructor(private gymsRepository: GymsRepository) { }


    async execute({ userLatitude, userLongitude }: FetchNearByGymsServiceParams): Promise<FetchNearByGymsServiceResponse> {

        const gyms = await this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude })

        return { gyms }
    }

}