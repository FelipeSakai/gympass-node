const uuidSchema = { type: "string", format: "uuid" } as const;
const dateTimeSchema = { type: "string", format: "date-time" } as const;

const nullableStringSchema = {
  anyOf: [{ type: "string" }, { type: "null" }],
} as const;

const coordinateSchema = {
  type: "number",
} as const;

const decimalResponseSchema = {
  anyOf: [{ type: "number" }, { type: "string" }],
} as const;

export const errorMessageSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  required: ["message"],
} as const;

export const validationErrorSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
    issues: { type: "object", additionalProperties: true },
  },
  required: ["message", "issues"],
} as const;

export const authTokenSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
  required: ["token"],
} as const;

export const userSchema = {
  type: "object",
  properties: {
    id: uuidSchema,
    name: { type: "string" },
    email: { type: "string", format: "email" },
    role: { type: "string", enum: ["MEMBER", "ADMIN"] },
    created_at: dateTimeSchema,
  },
  required: ["id", "name", "email", "role", "created_at"],
} as const;

export const gymSchema = {
  type: "object",
  properties: {
    id: uuidSchema,
    title: { type: "string" },
    description: nullableStringSchema,
    phone: nullableStringSchema,
    latitude: decimalResponseSchema,
    longitude: decimalResponseSchema,
  },
  required: ["id", "title", "description", "phone", "latitude", "longitude"],
} as const;

export const checkInSchema = {
  type: "object",
  properties: {
    id: uuidSchema,
    created_at: dateTimeSchema,
    validated_at: {
      anyOf: [dateTimeSchema, { type: "null" }],
    },
    user_id: uuidSchema,
    gymId: {
      anyOf: [uuidSchema, { type: "null" }],
    },
  },
  required: ["id", "created_at", "validated_at", "user_id", "gymId"],
} as const;

export const registerUserSchema = {
  tags: ["users"],
  summary: "Cria um novo usuario",
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },
    },
    required: ["name", "email", "password"],
  },
  response: {
    201: { type: "null" },
    400: validationErrorSchema,
    409: errorMessageSchema,
  },
} as const;

export const authenticateSchema = {
  tags: ["users"],
  summary: "Autentica um usuario",
  body: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },
    },
    required: ["email", "password"],
  },
  response: {
    200: authTokenSchema,
    400: errorMessageSchema,
  },
} as const;

export const refreshTokenSchema = {
  tags: ["users"],
  summary: "Gera um novo token de acesso",
  security: [{ cookieAuth: [] }],
  response: {
    200: authTokenSchema,
    401: errorMessageSchema,
  },
} as const;

export const profileSchema = {
  tags: ["users"],
  summary: "Retorna o perfil do usuario autenticado",
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: "object",
      properties: {
        user: userSchema,
      },
      required: ["user"],
    },
    401: errorMessageSchema,
  },
} as const;

export const createGymSchema = {
  tags: ["gyms"],
  summary: "Cria uma academia",
  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: nullableStringSchema,
      phone: nullableStringSchema,
      latitude: coordinateSchema,
      longitude: coordinateSchema,
    },
    required: ["title", "description", "phone", "latitude", "longitude"],
  },
  response: {
    201: { type: "null" },
    400: validationErrorSchema,
    401: errorMessageSchema,
    403: errorMessageSchema,
  },
} as const;

export const searchGymsSchema = {
  tags: ["gyms"],
  summary: "Busca academias por nome",
  security: [{ bearerAuth: [] }],
  querystring: {
    type: "object",
    properties: {
      q: { type: "string" },
      page: { type: "integer", default: 1 },
    },
    required: ["q"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        gyms: { type: "array", items: gymSchema },
      },
      required: ["gyms"],
    },
    400: validationErrorSchema,
    401: errorMessageSchema,
  },
} as const;

export const nearbyGymsSchema = {
  tags: ["gyms"],
  summary: "Lista academias proximas",
  security: [{ bearerAuth: [] }],
  querystring: {
    type: "object",
    properties: {
      latitude: coordinateSchema,
      longitude: coordinateSchema,
    },
    required: ["latitude", "longitude"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        gyms: { type: "array", items: gymSchema },
      },
      required: ["gyms"],
    },
    400: validationErrorSchema,
    401: errorMessageSchema,
  },
} as const;

export const createCheckInSchema = {
  tags: ["check-ins"],
  summary: "Realiza check-in em uma academia",
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: {
      gymId: uuidSchema,
    },
    required: ["gymId"],
  },
  body: {
    type: "object",
    properties: {
      latitude: coordinateSchema,
      longitude: coordinateSchema,
    },
    required: ["latitude", "longitude"],
  },
  response: {
    201: { type: "null" },
    400: validationErrorSchema,
    401: errorMessageSchema,
    403: errorMessageSchema,
  },
} as const;

export const validateCheckInSchema = {
  tags: ["check-ins"],
  summary: "Valida um check-in",
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: {
      checkInId: uuidSchema,
    },
    required: ["checkInId"],
  },
  response: {
    204: { type: "null" },
    400: validationErrorSchema,
    401: errorMessageSchema,
    403: errorMessageSchema,
  },
} as const;

export const checkInMetricsSchema = {
  tags: ["check-ins"],
  summary: "Retorna metricas de check-in do usuario",
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      type: "object",
      properties: {
        checkInsCount: { type: "integer" },
      },
      required: ["checkInsCount"],
    },
    401: errorMessageSchema,
  },
} as const;

export const checkInHistorySchema = {
  tags: ["check-ins"],
  summary: "Lista o historico de check-ins do usuario",
  security: [{ bearerAuth: [] }],
  querystring: {
    type: "object",
    properties: {
      page: { type: "integer", default: 1 },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        checkIns: { type: "array", items: checkInSchema },
      },
      required: ["checkIns"],
    },
    400: validationErrorSchema,
    401: errorMessageSchema,
  },
} as const;
