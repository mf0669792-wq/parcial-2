// src/models/TuitionI.ts

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface TuitionI {
  id?: number;
  registrationDate: Date;
  city: string;
  payment: number;
  car_id: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Tuition extends Model {
  public id!: number;
  public registrationDate!: Date;
  public city!: string;
  public payment!: number;
  public car_id!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Tuition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "registration_date",
      validate: {
        isDate: {
          msg: "Registration date must be valid",
          args: true,
        },
      },
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "City cannot be empty" },
        len: {
          args: [2, 100],
          msg: "City must contain between 2 and 100 characters",
        },
      },
    },

    payment: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: "Payment must be numeric",
        },
        min: {
          args: [0],
          msg: "Payment cannot be negative",
        },
      },
    },

    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cars",
        key: "id",
      },
      validate: {
        isInt: {
          msg: "Car id must be an integer",
        },
      },
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tuition",
    tableName: "tuitions",
    timestamps: false,
  }
);