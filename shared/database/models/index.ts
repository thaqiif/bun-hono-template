import fs from "fs";
import path from "path";
import { DataTypes, Sequelize } from "sequelize";
import type { UserInterface } from "./user";

interface Db {
    sequelize: Sequelize;
    User: UserInterface;
}

const basename = path.basename(__filename);
const dbSetup: any = {};

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: +(process.env.DB_PORT || 5432),
});

fs
    .readdirSync(__dirname)
    .filter((file: string) =>
        (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts' || file.slice(-3) === '.js'))
    .forEach((file: any) => {
        const model = require(path.join(__dirname, file))["default"](sequelize, DataTypes);
        dbSetup[model.name] = model;
    });

Object.keys(dbSetup).forEach(modelName => {
    if (dbSetup[modelName].associate) {
        dbSetup[modelName].associate(dbSetup);
    }
});

dbSetup.sequelize = sequelize;

const db = dbSetup as Db;

export default db;
