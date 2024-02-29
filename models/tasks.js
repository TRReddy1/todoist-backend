"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ projects, comments, labels }) {
      // define association here
      this.belongsTo(projects, {
        foreignKey: "projectId",
        as: "project",
        onDelete: "CASCADE",
      });
      this.hasMany(comments, {
        foreignKey: "taskId",
        as: "comments",
        onDelete: "CASCADE",
      });
      this.belongsToMany(labels, {
        through: "tasklabels",
        foreignKey: "taskId",
        as: "labels",
        onDelete: "CASCADE",
      });
    }
  }
  tasks.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "name should not be null",
          notEmpty: "name should not be empty",
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tasks",
      modelName: "tasks",
    }
  );
  return tasks;
};
