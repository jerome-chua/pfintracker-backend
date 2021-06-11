import jsSHA from 'jssha';
import parse from 'csv-parse';
import fs from 'fs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    shaObj.update('pw123');
    const hashedPassword = shaObj.getHash('HEX');
    const usersList = [
      {
        name: 'jerome',
        email: 'jerome123@gmail.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      }, 
      {
        name: 'chua',
        email: 'chua123@gmail.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', usersList);
  },

  down: async (queryInterface) => {
    // await queryInterface.bulkDelete('expenses', null, {});
    await queryInterface.bulkDelete('users', null, {});

  }
};
