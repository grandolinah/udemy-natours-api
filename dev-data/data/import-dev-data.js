const fs = require('fs');
const dotend = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');

dotend.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('db connected succesful.');
  });

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA IN DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data sucessfully loaded');
  } catch (err) {
    console.log(err);
  }
};

// DELETE DATE FROM THE DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data sucessfully deleted');
    // eslint-disable-next-line no-process-exit
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
  // eslint-disable-next-line no-process-exit
  process.exit();
}
