// controllers/expo.js
const Expo = require("../models/expo");

// INDEX - Show all Expo entries
module.exports.index = async (req, res) => {
  const allExpo = await Expo.find({}).populate("owner");
  res.render("listings/expoindex", { allExpo });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/expoadd");
};

// CREATE Expo Entry
module.exports.createExpo = async (req, res) => {
  const newExpo = new Expo(req.body.expo);
  newExpo.owner = req.user._id;
  await newExpo.save();

  req.flash("success", "New Journey has Started...");
  res.redirect("/expo");
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const expo = await Expo.findById(id).populate("owner");

  if (!expo) {
    req.flash("error", "Expo not found!");
    return res.redirect("/expo");
  }

  res.render("listings/expoedit", { expo });
};

// UPDATE Expo Entry
module.exports.updateExpo = async (req, res) => {
  const { id } = req.params;
  await Expo.findByIdAndUpdate(id, { ...req.body.expo });

  req.flash("success", "Expo Updated!");
  res.redirect("/expo");
};

// DELETE Expo Entry
module.exports.deleteExpo = async (req, res) => {
  const { id } = req.params;
  await Expo.findByIdAndDelete(id);

  req.flash("success", "Expo Deleted!");
  res.redirect("/expo");
};
