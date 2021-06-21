import db from './models/index.mjs';

import initTransactionsController from './controllers/transactions.mjs';
import initUserControllers from './controllers/users.mjs';

export default function bindRoutes(app) {
  const TransactController = initTransactionsController(db);
  app.get('/gettransactions/:userId', TransactController.getTransactions);
  app.post('/addtransaction/', TransactController.addTransaction);
  app.get('/getcategories', TransactController.getCategories);
  app.get('/gethashtags', TransactController.getHashtags);
  app.delete('/deletetransactions', TransactController.deleteTransactions);

  const UsersController = initUserControllers(db);
}
