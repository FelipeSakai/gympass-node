import { makeGetUserProfileService } from "@/services/factories/makeGetUserProfileService.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileService();

  const { user } = await getUserProfile.execute({ userId: request.user.sub });

  return reply.status(200).send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  });
}
