require("dotenv").config();   

const mongoose = require("mongoose");
const User = require("./models/user");


const MONGO_URI = process.env.MONGODB_URI; 

mongoose.connect(MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

async function createAdmin() {
  const admin = new User({ 
    username: "adminUser",
    email: "admin@gmail.com",
    isAdmin: true
  });

  await User.register(admin, "AdminPassword123");
  console.log("Admin Created Successfully");
  mongoose.connection.close();
}
createAdmin();
