import type { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: "MEMBER" | "ADMIN") {
  return async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      reply.status(403).send({ message: "Unauthorized" });
    }
  };
}
