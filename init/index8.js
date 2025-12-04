const mongoose = require("mongoose");
const initData = require("./arise.js");
const Arise = require("../models/arise.js");
require("dotenv").config();

const MONGO_URI = process.env.MONGODB_URI; 
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URI);
}
const initDB = async () => {
  await Arise.deleteMany({});
  await Arise.insertMany(initData.data);
  console.log("data was initialized");

};
initDB();