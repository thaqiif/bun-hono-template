import type { SequelizeModelBase } from "../sequelize_model_base/sequelize_model_base.model";

export interface User extends SequelizeModelBase {
    name: string;
}