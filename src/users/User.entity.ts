import { Model, DataTypes } from "sequelize";
import { DBConn } from "../DB/DBConn";

export class User extends Model {
  declare idName: string;
  declare password: string;
}

User.init(
  {
    idName: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize: DBConn, modelName: "User" }
);
