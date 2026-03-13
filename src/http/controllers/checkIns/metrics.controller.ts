import { makeGetUserMetricsService } from "@/services/factories/makeGetUserMetricsService.js";
import { makeSearchGymsService } from "@/services/factories/makeSearchGymsService.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function metricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetricsService = makeGetUserMetricsService();

  const { checkInsCount } = await getUserMetricsService.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
}
