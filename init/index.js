const mongoose = require("mongoose");
const initData = require("./data.js");
const Mort = require("../models/mortgage.js");


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
  await Mort.deleteMany({});
  await Mort.insertMany(initData.data);
  console.log("data was initialized");


};
initDB();