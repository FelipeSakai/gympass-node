import type { CheckIn, Prisma } from "generated/prisma/client.js";
import type { CheckInsRepository } from "../checkIns.repository.js";
import { randomUUID } from "node:crypto";
import { check } from "zod";

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = [];
    async findByUserIdOnDate(userId: string, date: Date) {
        const checkInOnSameDate = this.items.find(
            (checkIn) => checkIn.user_id === userId,

        )

        return checkInOnSameDate || null;

    };

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gymId: data.gymId ?? null,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn);

        return checkIn;
    }

}