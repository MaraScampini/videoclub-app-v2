'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id_user: 1,
          username: "Admin",
          name: "Admin",
          address: "Admin address",
          city: "Admin city",
          password:
            "ps911r5u0cCD12qVdyOA8MzIPxy314yjGE0R9zUU86fE43V3mqh2XHBGaJTfBBJ48nqLskUqN5NW25ORJBkQ4w==",
          email: "admin@admin.com",
          date_of_sign_up: "2022-12-01",
          deleted: 0,
          RoleIdRole: "admin"
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
