const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goSchema = new Schema({
  title: { type: String, required: true },
  description: String,

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("Go", goSchema);
