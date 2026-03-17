import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { usersRoutes } from "./http/controllers/users/routes.js";
import { ZodError } from "zod/v3";
import { env } from "./env/index.js";
import fastifyJwt from "@fastify/jwt";
import { gymRoutes } from "./http/controllers/gyms/routes.js";
import { checkInRoutes } from "./http/controllers/checkIns/routes.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerOptions, swaggerUiOptions } from "./docs/swagger.js";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);
app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register(usersRoutes);
app.register(gymRoutes);
app.register(checkInRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
});
