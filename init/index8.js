const mongoose = require("mongoose");
const initData = require("./arise.js");
const Arise = require("../models/arise.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Arisemax";
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
  await Arise.deleteMany({});
  await Arise.insertMany(initData.data);
  console.log("data was initialized");

};
initDB();