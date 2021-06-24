const parse = require('csv-parse');
const fs = require('fs');

async function translateCsv(filename) {
  return new Promise((resolve) => {
    const arr = [];
    fs.createReadStream(`${__dirname}/seeders/${filename}.csv`)
      .pipe(
        parse({
          delimiter: ',',
        }),
      )
      .on('data', (dataRow) => {
        arr.push(dataRow);
      })
      .on('end', () => {
        console.log(arr);
        resolve(arr);
      });
  });
}

const readCsvFn = async () => {
  try {
    const csvData = {};

    csvData.transactions = await translateCsv('seed_data');

    return csvData;
  } catch (err) {
    console.log(err);
  }
};

module.exports = readCsvFn;
