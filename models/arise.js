const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ariseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});
const Arise= mongoose.model("Arise", ariseSchema);
module.exports = Arise;