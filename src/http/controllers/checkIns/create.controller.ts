import { makeCheckInService } from "@/services/factories/makeCheckInService.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.uuid(),
  });

  const createCheckInsBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = createCheckInsBodySchema.parse(request.body);
  const { gymId } = createCheckInParamsSchema.parse(request.params);

  const createCheckInService = makeCheckInService();

  await createCheckInService.execute({
    gymId,
    userId: request.user.sub,
    UserLatitude: latitude,
    UserLongitude: longitude,
  });

  return reply.status(201).send();
}
