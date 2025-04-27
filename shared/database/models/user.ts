import { DataTypes, Model, type InferAttributes, type InferCreationAttributes } from 'sequelize';

const modelName = 'User';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare name: string;
}

export default (sequelize: any) => {
    return User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName,
        paranoid: true,
        underscored: true
    });
}

export type UserInterface = typeof User;
