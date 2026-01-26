import fastify from "fastify";
import { prisma } from "../lib/prisma.js";

export const app = fastify();


prisma.user.create({
    data: {
        name: 'Felipe Sakai',
        email: 'felipesakaiipolito@gmail.com'
    }
})