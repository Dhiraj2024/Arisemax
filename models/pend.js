const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pendSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

module.exports = mongoose.model("Pend", pendSchema);