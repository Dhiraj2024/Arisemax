// models/expo.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expoSchema = new Schema({
  title: {
    type: String,
    required: true, // Career Name
  },
  eligibility: {
    type: String, // Course Name / Eligibility
    required: true,
  },
  details: {
    type: String, // Video Link / Extra Info
    required: true,
  },
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://media.wired.com/photos/65989cb9c256c0f1447f298c/3:2/w_2560%2Cc_limit/WW2024_1423783201_SECURITY_Scott-Shapiro.jpg",
      set: (v) =>
        v === ""
          ? "https://media.wired.com/photos/65989cb9c256c0f1447f298c/3:2/w_2560%2Cc_limit/WW2024_1423783201_SECURITY_Scott-Shapiro.jpg"
          : v,
    },
  },
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    },
});

const Expo = mongoose.model("Expo", expoSchema);
module.exports = Expo;
