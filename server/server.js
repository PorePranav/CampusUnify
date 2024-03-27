const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception, Shutting Down!');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log('DB Connection Successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection, Shutting Down!');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
