"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "projects",
      [
        {
          id: "a74b8096-15d7-4dcb-9d91-cbd77a3d48fe",
          name: "project 1",
          is_favorite: false,
          updatedAt: "2024-02-15T10:39:59.737Z",
          createdAt: "2024-02-15T10:39:59.737Z",
        },
        {
          id: "a74b8096-15d7-4dcb-9d91-cbd77a3d48fe",
          name: "project 2",
          is_favorite: false,
          updatedAt: "2024-02-15T10:39:59.737Z",
          createdAt: "2024-02-15T10:39:59.737Z",
        },
        {
          id: "a74b8096-15d7-4dcb-9d91-cbd77a3d48fe",
          name: "project 3",
          is_favorite: false,
          updatedAt: "2024-02-15T10:39:59.737Z",
          createdAt: "2024-02-15T10:39:59.737Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
