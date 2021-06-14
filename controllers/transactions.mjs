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

      res.send(transactions);
    } catch (err) {
      console.log("Error found while getTransactions:", err);
    }
  }


  return {
    getTransactions,
  }
}