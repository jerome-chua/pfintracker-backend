const jsSHA = require('jssha');
const csvData = require('./csv-data.js');

module.exports = {
  up: async (queryInterface) => {
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

    const transactionsList = [];

    for (let i = 1; i < csvData.length; i++) {
      const row = csvData[i];
      const [transactDate, wallet, transactionType, categoryName, amount, note, hashTag] = row;

      const transaction = {
        user_id: 1,
        transaction_type: transactionType,
        amount: parseFloat(amount.substring(1)),
        currency: 'SGD',
        note,
        category: categoryName,
        hashtag: hashTag,
        created_at: new Date(Date.parse(transactDate)),
        updated_at: new Date(),
      };

      transactionsList.push(transaction);
    }
    await queryInterface.bulkInsert('transactions', transactionsList);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
