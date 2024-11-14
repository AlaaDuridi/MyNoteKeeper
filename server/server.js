const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './server/config.env' });

const app = require('./app');


const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

console.log(process.env.DATABASE_LOCAL);
mongoose
  .connect(process.env.DATABASE_LOCAL, {
  // .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection successful!');
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
