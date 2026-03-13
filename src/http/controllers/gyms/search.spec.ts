import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app.js";
import { email } from "zod";
import { create } from "node:domain";
import { createAndAuthenticateUser } from "@/utils/test/createAndAuthenticateUser.js";

describe("create (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search for a gym", async () => {
    const { token } = await createAndAuthenticateUser(app);
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "GymName",
        description: "Gym Description",
        phone: "123456789",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Really Nice Gym ",
        description: "Gym Description",
        phone: "123456788",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "GymName",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "GymName",
      }),
    ]);
  });
});
