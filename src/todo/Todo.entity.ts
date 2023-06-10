/* eslint-disable prettier/prettier */
import { Model, DataTypes } from "sequelize";
import { DBConn } from "../DB/DBConn";

export class ToDo extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
}

ToDo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  { sequelize: DBConn, modelName: "ToDo" }
);
