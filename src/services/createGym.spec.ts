import { expect, describe, it, beforeEach } from "vitest";
import { compare } from "bcryptjs";
import { InMemoryGymRepository } from "@/repositories/in-memory/inMemoryGym.repository.js";
import { CreateGymService } from "./createGym.service.js";

let gymRepository: InMemoryGymRepository;
let sut: CreateGymService;

describe('Create Gym Service', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository();
        sut = new CreateGymService(gymRepository);
    })

    it('should be able to create gym', async () => {

        const { gym } = await sut.execute({
            tittle: 'Gym John Doe',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        })



        expect(gym.id).toEqual(expect.any(String))
    })

})