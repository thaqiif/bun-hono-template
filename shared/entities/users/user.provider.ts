import { Op } from "sequelize";
import db from "../../database/models";
import type { User } from "./user.model";

export class UserProvider {
    static async getAllUsers(): Promise<User[]> {
        const users = await db.User.findAll({
            where: {
                telegram_id: {
                    [Op.eq]: 1
                }
            }
        });
        if (!users) {
            return []
        }

        return users as any;
    }
}
