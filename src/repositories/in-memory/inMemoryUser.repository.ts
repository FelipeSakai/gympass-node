import type { Prisma, User } from "generated/prisma/client.js";
import type { UsersRepository } from "../users.repository.js";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((item) => item.email === email)

        return user || null;
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: "user-1",
            name: data.name,
            email: data.email,
            passwordHash: data.passwordHash,
            created_at: new Date(),
        }
        this.items.push(user);
        return user;
    }
}