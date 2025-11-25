// controllers/afr.js
const Afr = require("../models/afr");

module.exports.index = async (req, res) => {
  const allAfr = await Afr.find({}).populate("owner");
  res.render("listings/afrindex", { allAfr });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/afradd");
};

module.exports.createAfr = async (req, res) => {
  const newAfr = new Afr(req.body.afr);
  newAfr.owner = req.user._id;
  await newAfr.save();
  req.flash("success", "New Course has been added...");
  res.redirect("/afr");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const afr = await Afr.findById(id).populate("owner");
  res.render("listings/afredit", { afr });
};

module.exports.updateAfr = async (req, res) => {
  const { id } = req.params;
  await Afr.findByIdAndUpdate(id, { ...req.body.afr });
  req.flash("success", "Course Updated Successfully!");
  res.redirect("/afr");
};

module.exports.deleteAfr = async (req, res) => {
  const { id } = req.params;
  await Afr.findByIdAndDelete(id);
  req.flash("success", "Course Deleted!");
  res.redirect("/afr");
};
