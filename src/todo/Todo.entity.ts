import { Model, DataTypes, ForeignKey } from "sequelize";
import { DBConn } from "../DB/DBConn";
import { User } from "src/users/User.entity";

export class ToDo extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare userIdName: ForeignKey<User['idName']>;
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
