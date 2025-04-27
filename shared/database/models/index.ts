import fs from "fs";
import path from "path";
import { DataTypes, Sequelize } from "sequelize";

const basename = path.basename(__filename);
const db: any = {};

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
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

export default db;
