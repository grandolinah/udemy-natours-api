/* eslint-disable no-process-exit */
const dotend = require('dotenv');
const mongoose = require('mongoose');

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('💥Unhandled rejection. Shutting down.. 💥');

  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', err => {
  console.log('💥Unhandled exception. Shutting down.. 💥');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

dotend.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('db connected succesful.');
  });

const port = process.env.PORT || 8000;

// START SERVER
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
