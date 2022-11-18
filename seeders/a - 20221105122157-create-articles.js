'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articles', [
      {
        id_article: 1
      },
      {
        id_article: 2
      },
      {
        id_article: 3
      },
      {
        id_article: 4
      },
      {
        id_article: 5
      },
      {
        id_article: 6
      },
      {
        id_article: 7
      },
      {
        id_article: 8
      },
      {
        id_article: 9
      },
      {
        id_article: 10
      },
      {
        id_article: 11
      },
      {
        id_article: 12
      },
      {
        id_article: 13
      },
      {
        id_article: 14
      },
      {
        id_article: 15
      },
      {
        id_article: 16
      },
      {
        id_article: 17
      },
      {
        id_article: 18
      },
      {
        id_article: 19
      },
      {
        id_article: 20
      },
      {
        id_article: 21
      },
      {
        id_article: 22
      },
      {
        id_article: 23
      },
      {
        id_article: 24
      },
      {
        id_article: 25
      },
      {
        id_article: 26
      },
      {
        id_article: 27
      },
      {
        id_article: 28
      },
      {
        id_article: 29
      },
      {
        id_article: 30
      },
      {
        id_article: 31
      },
      {
        id_article: 32
      },
      {
        id_article: 33
      },
      {
        id_article: 34
      },
      {
        id_article: 35
      },
      {
        id_article: 36
      },
      {
        id_article: 37
      },
      {
        id_article: 38
      },
      {
        id_article: 39
      },
      {
        id_article: 40
      },

    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {});

  }
};
