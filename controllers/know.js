const Know = require("../models/know");
const ExpressError = require("../utils/ExpressEroor");

// INDEX
module.exports.index = async (req, res) => {
  const allKnow = await Know.find({ owner: req.user._id });
  res.render("listings/knowindex", { allKnow });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/knowadd");
};

// CREATE
module.exports.createKnow = async (req, res) => {
  const newKnow = new Know(req.body.know);
  newKnow.owner = req.user._id;
  await newKnow.save();

  req.flash("success", "New Know item created!");
  res.redirect("/know");
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;

  const know = await Know.findOne({
    _id: id,
    owner: req.user._id,
  });

  if (!know) {
    req.flash("error", "Not allowed!");
    return res.redirect("/know");
  }

  res.render("listings/knowedit", { know });
};

// UPDATE
module.exports.updateKnow = async (req, res) => {
  const { id } = req.params;

  await Know.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    { ...req.body.know }
  );

  req.flash("success", "Updated successfully");
  res.redirect("/know");
};

// DELETE
module.exports.deleteKnow = async (req, res) => {
  const { id } = req.params;

  await Know.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });

  req.flash("success", "Deleted successfully");
  res.redirect("/know");
};
