import { makeFetchCheckInsHistoryService } from "@/services/factories/makeFetchCheckInsHistoryService.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function historyController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkinHistoryQuerySchema = z.object({
    page: z.coerce.number().default(1),
  });

  const { page } = checkinHistoryQuerySchema.parse(request.query);

  const fetchCheckInsHistoryService = makeFetchCheckInsHistoryService();

  const { checkIns } = await fetchCheckInsHistoryService.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
