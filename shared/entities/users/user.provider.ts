import db from "../../database/models";
import type { User } from "./user.model";

export class UserProvider {
    static async getAllUsers(): Promise<User[]> {
        const users = await db.User.findAll();
        if (!users) {
            return []
        }

        return users as any;
    }
}
