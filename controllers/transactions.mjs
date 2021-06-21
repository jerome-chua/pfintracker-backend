import pkg from 'sequelize';

const { Op } = pkg;

export default function initTransactionsController(db) {
  const getTransactions = async (req, res) => {
    // const { userId } = req.params;
    const userId = 1;

    try {
      const transactions = await db.Transaction.findAll({
        where: {
          userId: Number(userId),
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      res.send(transactions);
    } catch (err) {
      console.log('Error found while getTransactions:', err);
    }
  };

  const addTransaction = async (req, res) => {
    // const { userId } = req.cookies;
    const userId = 1;
    const { transactionData } = req.body;

    console.log('see transactiondata!! ===========', transactionData);

    try {
      const user = await db.User.findByPk(Number(userId));
      const added = await db.Transaction.create({ ...transactionData, userId: 1 });

      res.send(added);
    } catch (err) {
      console.log('Error found while addTransaction:', err);
    }
  };

  const getCategories = async (req, res) => {
    try {
      const transactions = await db.Transaction.findAll();

      const categories = new Set();
      transactions.map((item) => {
        categories.add(item.category);
      });

      const catList = Array.from(categories);

      res.send(catList);
    } catch (err) {
      console.log('Error found while getCategories:', err);
    }
  };

  const getHashtags = async (req, res) => {
    try {
      const transactions = await db.Transaction.findAll();

      const hashtags = new Set();
      transactions.map((item) => {
        hashtags.add(item.hashtag);
      });

      const hashtagList = Array.from(hashtags);

      res.send(hashtagList);
    } catch (err) {
      console.log('Error found while getHashtags:', err);
    }
  };

  const deleteTransactions = async (req, res) => {
    // const { userId } = req.cookies;
    const userId = 1;
    const selected = req.body;

    console.log('selected: ---', req);

    try {
      const toDelete = await db.Transaction.destroy({
        where: {
          id: [...selected],
        },
      });

      const transactions = await db.Transaction.findAll({
        where: {
          userId: Number(userId),
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      res.send(transactions);
    } catch (err) {
      console.log('Error found while deleting:', err);
    }
  };

  return {
    getTransactions,
    addTransaction,
    getCategories,
    getHashtags,
    deleteTransactions,
  };
}
