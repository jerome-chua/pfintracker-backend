import db from './models/index.mjs';

import initTransactionsController from './controllers/transactions.mjs';
import initUserControllers from './controllers/users.mjs';

export default function bindRoutes(app) {
  const TransactController = initTransactionsController(db);
  app.get('/gettransactions/:userId', TransactController.getTransactions);
  app.post('/addtransaction/:userId', TransactController.addTransaction);
  
  const UsersController = initUserControllers(db);

}