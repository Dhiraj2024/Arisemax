const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const idolSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?...",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?..."
          : v,
    },
  },
});
const Idol= mongoose.model("Idol", idolSchema);
module.exports = Idol;