import { Sequelize } from "sequelize";
export const DBConn = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
const test = async () => {
  let flag=false;
  try {
    await DBConn.sync();
    await DBConn.authenticate().then(() => {
      flag=true;
    });
  } catch (error) {
    
  }
  return flag;
};

test()
  .then((flag) => {
    if (flag) {
      console.log('Connection has been established successfully.');
    }
  })
  .catch((error) => {
    console.error("Unable to connect to the database:");
    throw new Error(`Unable to connect to the database ${error}`);
  });
