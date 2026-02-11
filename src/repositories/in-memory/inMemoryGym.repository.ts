import { Prisma, type Gym } from "generated/prisma/client.js";
import type { GymsRepository } from "../gym.repository.js";
import { randomUUID } from "crypto";

export class InMemoryGymRepository implements GymsRepository {
    public items: Gym[] = [];


    async findById(id: string): Promise<Gym | null> {
        const gym = this.items.find((item) => item.id === id)
        return gym || null;
    }

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = {
            id: data.id ?? randomUUID(),
            tittle: data.tittle,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date(),
        }
        this.items.push(gym);
        return gym;
    }
}