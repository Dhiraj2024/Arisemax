const Pend = require("../models/pend");
const ExpressError = require("../utils/ExpressEroor");

// INDEX
module.exports.index = async (req, res) => {
  const allPend = await Pend.find({ owner: req.user._id });
  res.render("listings/pendindex", { allPend });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/pendadd");
};

// CREATE
module.exports.createPend = async (req, res) => {
  const newPend = new Pend(req.body.pend);
  newPend.owner = req.user._id;
  await newPend.save();

  req.flash("success", "New task added...");
  res.redirect("/pend");
};

// DELETE
module.exports.deletePend = async (req, res) => {
  const { id } = req.params;

  await Pend.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });

  req.flash("success", "Task deleted!");
  res.redirect("/pend");
};
