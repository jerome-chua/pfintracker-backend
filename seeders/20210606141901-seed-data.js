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

    // const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#f55b5f', '#0bc77e', '#04e38d', '#00ff9d']; 

    // const expenseCategories = [
    //   { type: 'Bills', color: expenseColors[0] },
    //   { type: 'Books', color: expenseColors[1] },
    //   { type: 'Church', color: expenseColors[2] },
    //   { type: 'Transportation', color: expenseColors[3] },
    //   { type: 'Food & Drinks', color: expenseColors[4] },
    //   { type: 'Shopping', color: expenseColors[5] },
    //   { type: 'Gifts', color: expenseColors[6] },
    //   { type: 'Entertainment', color: expenseColors[7] },
    //   { type: 'Haircuts', color: expenseColors[8] },
    //   { type: 'Investment', color: expenseColors[9] },
    //   { type: 'Medical', color: expenseColors[10] },
    //   { type: 'Sports', color: expenseColors[11] },
    //   { type: 'Salary', color: expenseColors[12] },
    // ];
    const expensesList = [];
    
    for (let i=1; i<csvData.length; i++) {
      
      let row = csvData[i];
      const [transactDate, wallet, expenseType, categoryName, amount, note, hashTag] = row;
  
      let expense = {
        user_id: 1, 
        expense_type: expenseType,
        amount: parseFloat(amount.substring(1)),
        currency: 'SGD',
        note: note,
        category: categoryName,
        hashtag: hashTag,
        created_at: new Date(Date.parse(transactDate)),
        updated_at: new Date(),
      };

      expensesList.push(expense);
    }
    await queryInterface.bulkInsert('expenses', expensesList);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('expenses', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
