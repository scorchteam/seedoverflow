import { Model, DataTypes } from "sequelize";
import { connection as sequelize } from "./connection";

export class User extends Model {}

User.init({
    uuid: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'user2',
    sequelize,
    modelName: 'User'
})