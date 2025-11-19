const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const afrSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});
const Afr= mongoose.model("Afr", afrSchema);
module.exports = Afr;