import type { Gym } from "generated/prisma/client.ts";
import type { GymCreateInput } from "generated/prisma/models.js";
import type {
  FindManyNearbyGymsParams,
  GymsRepository,
} from "../gym.repository.js";
import { prisma } from "@/lib/prisma.js";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates.js";

export class PrismaGymRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id },
    });
    return gym;
  }
  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    });
    return gyms;
  }
  async create(data: GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    });
    return gym;
  }
  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyGymsParams): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany();

    return gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      );

      return distance < 10;
    });
  }
}
