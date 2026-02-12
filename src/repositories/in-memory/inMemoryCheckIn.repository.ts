import type { CheckIn, Prisma } from "generated/prisma/client.js";
import type { CheckInsRepository } from "../checkIns.repository.js";
import { randomUUID } from "node:crypto";
import { check } from "zod";
import dayjs from "dayjs";
import { is } from "zod/locales";

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = [];
    async findByUserIdOnDate(userId: string, date: Date) {

        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkInOnSameDate = this.items.find(
            (checkIn) => {
                const checkInDate = dayjs(checkIn.created_at);

                const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

                return checkIn.user_id === userId && isOnSameDate
            }

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

    async findManyByUserId(userId: string, page: number) {
        const checkIns = this.items
            .filter((checkIn) => checkIn.user_id === userId)
            .slice((page - 1) * 20, page * 20);
        return checkIns;
    }

    async countByUserId(userId: string) {
        const count = this.items
            .filter((checkIn) => checkIn.user_id === userId)
            .length;

        return count;
    }
}