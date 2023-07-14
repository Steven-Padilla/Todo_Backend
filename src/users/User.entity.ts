import { Model, DataTypes } from "sequelize";
import { DBConn } from "../DB/DBConn";
import { ToDo } from "src/todo/Todo.entity";

export class User extends Model {
  declare idName: string;
  declare password: string;
}

User.init(
  {
    idName: {
      type:DataTypes.STRING,
      primaryKey:true,
      unique:true
    },
    password: DataTypes.STRING,
  },
  { sequelize: DBConn, modelName: "User" }
);
User.hasMany(ToDo,{
  sourceKey:'idName',
  foreignKey:'userIdName',
  as: 'ToDo'
})
