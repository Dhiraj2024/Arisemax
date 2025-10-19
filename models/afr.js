const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const afrSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  
});
const Afr= mongoose.model("Afr", afrSchema);
module.exports = Afr;