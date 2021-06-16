const parse = require('csv-parse');
const fs = require('fs');

let csvData = [];
  fs.createReadStream(`${__dirname}/seed_data.csv`)
  .pipe(
      parse({
        delimiter: ','
    })
  )
  .on('data', (dataRow) => {
    csvData.push(dataRow)
  })
  .on('end', () => {
    console.log(csvData);
  })

module.exports = csvData;
 