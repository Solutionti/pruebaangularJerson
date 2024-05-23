import { DataTypes } from "sequelize";
import sequelize  from "../db/connection";

export const compras = sequelize.define('compra', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,

  },
  descripcion: {
    type: DataTypes.STRING,
  }
})