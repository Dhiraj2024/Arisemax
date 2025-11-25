const Mort = require("../models/mortgage");
const ExpressError = require("../utils/ExpressEroor");

// INDEX
module.exports.index = async (req, res) => {
  const allMort = await Mort.find({ owner: req.user._id });
  res.render("listings/mortindex", { allMort });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/mortadd");
};

// CREATE
module.exports.createMort = async (req, res) => {
  const newMort = new Mort(req.body.mort);
  newMort.owner = req.user._id;
  await newMort.save();

  req.flash("success", "New Pain is created...");
  res.redirect("/mort");
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const mort = await Mort.findOne({ _id: id, owner: req.user._id });

  if (!mort) {
    req.flash("error", "Not allowed!");
    return res.redirect("/mort");
  }

  res.render("listings/mortedit", { mort });
};

// UPDATE
module.exports.updateMort = async (req, res) => {
  const { id } = req.params;

  await Mort.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    { ...req.body.mort } // ⭐ yaha aapne Mistake ki thi (Mort likh diya tha)
  );

  req.flash("success", "Updated successfully!");
  res.redirect("/mort");
};

// DELETE
module.exports.deleteMort = async (req, res) => {
  const { id } = req.params;

  await Mort.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });

  req.flash("success", "Deleted successfully!");
  res.redirect("/mort");
};
