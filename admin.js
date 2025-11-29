const mongoose = require("mongoose");
const User = require("./models/user");

mongoose.connect("mongodb://127.0.0.1:27017/Arisemax")
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
