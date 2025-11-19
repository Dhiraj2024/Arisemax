const mongoose = require("mongoose");
const initData = require("./data.js");
const Afr = require("../models/afr.js");
const { Types } = mongoose;   // <-- IMPORTANT

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
  await Afr.deleteMany({});
     initData.data  = initData.data.map((obj) => ({
    ...obj,
  owner: new Types.ObjectId("691414b375153ee2ac434f93"),  // <-- FIXED

   }));
  await Afr.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();