export default function initTransactionsController(db) {
  
  const getTransactions = async (req, res) => {
    // const { userId } = req.params;
    let userId = 1;

    try {
      const transactions = await db.Transaction.findAll({
        where: {
          userId: Number(userId),
        },
      });

      console.log("TRANSACTIONS ====================\n\n", transactions);

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

      console.log("Add succesfully: -----", add);

      res.send("SUCCESS")
    } catch (err) {
       console.log("Error found while addTransaction:", err);
    }
  }

  return {
    getTransactions,
    addTransaction,
  }
}