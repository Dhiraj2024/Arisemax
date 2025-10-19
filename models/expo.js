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
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&w=800&q=60",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?auto=format&fit=crop&w=800&q=60"
          : v,
    },
  },
});

const Expo = mongoose.model("Expo", expoSchema);
module.exports = Expo;
