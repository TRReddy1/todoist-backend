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
      "tasks",
      [
        {
          id: "fcf1f5d4-51bd-4261-a8f3-3e087d7c4a76",
          is_completed: false,
          name: "task 1",
          description: "",
          projectId: "790e422b-2cf2-481e-913c-a509c5c5de3f",
          updatedAt: "2024-02-15T10:46:34.307Z",
          createdAt: "2024-02-15T10:46:34.307Z",
        },
        {
          id: "52cdbf58-9691-4c7e-ae90-55c03e01f369",
          is_completed: false,
          name: "task 2",
          description: "",
          projectId: "790e422b-2cf2-481e-913c-a509c5c5de3f",
          updatedAt: "2024-02-15T10:48:21.268Z",
          createdAt: "2024-02-15T10:48:21.268Z",
        },
        {
          id: "52cdbf58-9691-4c7e-ae90-55c03e01f369",
          is_completed: false,
          name: "task 3",
          description: "",
          projectId: "790e422b-2cf2-481e-913c-a509c5c5de3f",
          updatedAt: "2024-02-15T10:48:21.268Z",
          createdAt: "2024-02-15T10:48:21.268Z",
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
