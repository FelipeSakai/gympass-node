import { prisma } from "@/lib/prisma.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body);

    await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: password,
        },
    })

    return reply.status(201).send();
}