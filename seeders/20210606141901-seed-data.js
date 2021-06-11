import { GoogleSpreadsheet } from "google-spreadsheet";
import creds from "../client_secret.js";

const SHEET_ID = "15CWgsB3aTdEcY_dR7pnCOR70SxQP7LljEwGTxfaQOZo";
const doc = new GoogleSpreadsheet(SHEET_ID);

async function accessSheets() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  console.log("Doc", doc.title);

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
  console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);
}

accessSheets();


//https://www.youtube.com/watch?v=ftxroBc7mi4
module.exports = {
  up: async (queryInterface, Sequelize) => {
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('expense', null, {});
    await queryInterface.bulkDelete('user', null, {});

  }
};
