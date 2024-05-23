import { Sequelize } from "sequelize";

const sequelize = new Sequelize('angularprueba', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'    
});

export default sequelize;