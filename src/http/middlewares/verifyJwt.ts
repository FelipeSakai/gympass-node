import type { FastifyReply, FastifyRequest } from "fastify";
import { tr } from "zod/locales";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
