const mongoose = require("mongoose");
const initData = require("./expodata.js");
const Expo = require("../models/expo.js");
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
  await Expo.deleteMany({});
       initData.data  = initData.data.map((obj) => ({
      ...obj,
    owner: new Types.ObjectId("691414b375153ee2ac434f93"),  // <-- FIXED
  
     }));
  await Expo.insertMany(initData.data);
  console.log("data was initialized");
};
initDB();