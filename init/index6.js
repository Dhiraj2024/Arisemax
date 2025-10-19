const mongoose = require("mongoose");
const initData = require("./data.js");
const Idol = require("../models/idol.js");

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
  await Idol.deleteMany({});
  await Idol.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();