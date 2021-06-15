export default function initTransactionsController(db) {
  
  const getTransactions = async (req, res) => {
    // const { userId } = req.params;
    let userId = 1;

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
      console.log("Error found while getTransactions:", err);
    }
  }

  const addTransaction = async (req, res) => {
    // const { userId } = req.cookies;
    let userId = 1;

    const {transactionData} = req.body;

    try {
      const user = await db.User.findByPk(Number(userId));
      const add = await user.addTransaction(transactionData);

      res.send("SUCCESS")
    } catch (err) {
       console.log("Error found while addTransaction:", err);
    }
  }

  const getCategories = async (req, res) => {
    try {
      const transactions = await db.Transaction.findAll();

      const categories = new Set();
      transactions.map(item => {
        categories.add(item.category);
      })  

      const catList = Array.from(categories);

      res.send(catList);
    } catch (err) {
      console.log("Error found while getCategories:", err);
    }
  }
  
  const getHashtags = async (req, res) => {
    try {
      const transactions = await db.Transaction.findAll();

      const hashtags = new Set();
      transactions.map(item => {
        hashtags.add(item.hashtag);
      })  

      const hashtagList = Array.from(hashtags);

      res.send(hashtagList);
    } catch (err) {
      console.log("Error found while getHashtags:", err);
    }
  }
  return {
    getTransactions,
    addTransaction,
    getCategories,
    getHashtags
  }
}