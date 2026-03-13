import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app.js";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser.js";
import { prisma } from "@/lib/prisma.js";

describe("create check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);
    const gym = await prisma.gym.create({
      data: {
        title: "Gym Name",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    const checkInResponse = await request(app.server)
      .post(`/gyms/${gym.id}/checkIns`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    expect(checkInResponse.status).toEqual(201);
  });
});
