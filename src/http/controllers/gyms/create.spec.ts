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

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app);
    const gymResponse = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Gym Name",
        description: "Gym Description",
        phone: "123456789",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(gymResponse.status).toEqual(201);
  });
});
