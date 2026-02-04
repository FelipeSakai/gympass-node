import { UserAlreadyExistsError } from "@/services/errors/userAlreadyExists.error.js";
import { makeRegisterService } from "@/services/factories/makeRegisterService.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        const registerService = makeRegisterService();

        await registerService.execute({ name, email, password });
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }

        return reply.status(500).send(); //TODO: Melhorar isso aqui depois
    }

    return reply.status(201).send();
}