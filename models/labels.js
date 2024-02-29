"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class labels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ tasks }) {
      // define association here
      this.belongsToMany(tasks, {
        through: "tasklabels",
        foreignKey: "labelId",
        as: "tasks",
        onDelete: "CASCADE",
      });
    }
  }
  labels.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      is_favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "labels",
      modelName: "labels",
    }
  );
  return labels;
};
