import type { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import type { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: "GymPass API",
      description: "Documentacao da API para usuarios, academias e check-ins.",
      version: "1.0.0",
    },
    tags: [
      { name: "users", description: "Operacoes de usuarios e autenticacao" },
      { name: "gyms", description: "Operacoes de academias" },
      { name: "check-ins", description: "Operacoes de check-in" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
        },
      },
    },
  },
};

export const swaggerUiOptions: FastifySwaggerUiOptions = {
  routePrefix: "/docs",
};
