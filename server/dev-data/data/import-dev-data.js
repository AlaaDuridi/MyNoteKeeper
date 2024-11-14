const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Note = require('../../models/noteModel');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    // .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection successful!');
  });

const notes =  fs.readFileSync(`${__dirname}/notes-simple.json`, 'utf-8');

const importData = async () => {
  try {
    await Note.create(JSON.parse(notes));
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
}

const deleteData = async () => {
  try {
    await Note.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
}

if(process.argv[2] === 'import') {
  importData();
}
if(process.argv[2] === 'delete') {
  deleteData();
}