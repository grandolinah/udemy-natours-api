const dotend = require('dotenv');
const mongoose = require('mongoose');

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
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
