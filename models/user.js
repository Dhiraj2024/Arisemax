const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
      required: true,
    },
});
//FOR USERNAME , PASSWORRD + HASHING + SALTING
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);

       