"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Category has many Todos
      Category.hasMany(models.Todo, {
        foreignKey: "category_id",
        as: "todos",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "Categories",
      timestamps: true,
    }
  );

  return Category;
};
