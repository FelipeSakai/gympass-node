import { InvalidCredentialsError } from "@/services/errors/invalidCredential.error.js";
import { makeAuthenticateService } from "@/services/factories/makeAuthenticateService.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateService = makeAuthenticateService();

        await authenticateService.execute({ email, password });
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }

        return err
    }

    return reply.status(200).send();
}