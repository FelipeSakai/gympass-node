import { makeCheckInService } from "@/services/factories/makeCheckInService.js";
import { makeValidateCheckInService } from "@/services/factories/makeValidateCheckInService.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function validateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInService = makeValidateCheckInService();

  await validateCheckInService.execute({
    checkInId,
  });

  return reply.status(204).send();
}
