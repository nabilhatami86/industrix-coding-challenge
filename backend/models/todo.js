"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // Todo belongs to Category
      Todo.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }

  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      priority: {
        type: DataTypes.ENUM("high", "medium", "low"),
        defaultValue: "low",
      },
      due_date: DataTypes.DATE,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todo",
      tableName: "Todos",
      underscored: false,
      timestamps: true,
    }
  );

  return Todo;
};
