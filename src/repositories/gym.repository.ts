import type { Gym, Prisma } from "generated/prisma/client.js";

export interface FindManyNearbyGymsParams {
    latitude: number;
    longitude: number;
}
export interface GymsRepository {
    findById(id: string): Promise<Gym | null>;
    searchMany(query: string, page: number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>;
    findManyNearby(params: FindManyNearbyGymsParams): Promise<Gym[]>
}