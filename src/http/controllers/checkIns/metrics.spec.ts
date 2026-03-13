import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app.js";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser.js";
import { prisma } from "@/lib/prisma.js";

describe("get check-in metrics (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get check-in metrics", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();
    const gym = await prisma.gym.create({
      data: {
        title: "Gym Name",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gymId: gym.id,
        },
        {
          user_id: user.id,
          gymId: gym.id,
        },
      ],
    });

    const checkInResponse = await request(app.server)
      .get(`/checkIns/metrics`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(checkInResponse.status).toEqual(200);
    expect(checkInResponse.body.checkInsCount).toEqual(2);
  });
});
