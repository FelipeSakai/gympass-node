import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/inMemoryGym.repository.js";
import { SearchGymService } from "./searchGyms.service.js";



let gymsRepository: InMemoryGymRepository;
let sut: SearchGymService;
describe('Search Gym Service', () => {

    beforeEach(async () => {
        gymsRepository = new InMemoryGymRepository();
        sut = new SearchGymService(gymsRepository);


    })

    it('should be able to search for gyms', async () => {

        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        await gymsRepository.create({
            title: 'Gym John Doe Brother',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        })

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 1
        })

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' }),])
    })

    it('should be able to fetch paginated gyms search', async () => {

        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JavaScript Gym ${i}`,
                description: null,
                phone: null,
                latitude: -27.2092052,
                longitude: -49.6401091,
            })
        }

        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 2,
        })

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym 21' }),
            expect.objectContaining({ title: 'JavaScript Gym 22' }),
        ])
    })

})