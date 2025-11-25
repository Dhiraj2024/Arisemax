// controllers/daily.js
const Daily = require("../models/daily");

// Index - Show all Daily of logged-in user
module.exports.index = async (req, res) => {
  const allDaily = await Daily.find({ owner: req.user._id });
  res.render("listings/dailyindex", { allDaily });
};

// Render New Form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/dailyadd");
};

// Create Daily Entry
module.exports.createDaily = async (req, res) => {
  const newDaily = new Daily(req.body.daily);
  newDaily.owner = req.user._id;
  await newDaily.save();

  req.flash("success", "New Daily Record Added!");
  res.redirect("/daily");
};

// Render Edit Form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;

  const daily = await Daily.findOne({
    _id: id,
    owner: req.user._id, // ensure same user
  });

  if (!daily) {
    req.flash("error", "You are not allowed!");
    return res.redirect("/daily");
  }

  res.render("listings/dailyedit", { daily });
};

// Update Daily Entry
module.exports.updateDaily = async (req, res) => {
  const { id } = req.params;

  await Daily.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    { ...req.body.daily }
  );

  req.flash("success", "Daily Record Updated!");
  res.redirect("/daily");
};

// Delete Daily Entry
module.exports.deleteDaily = async (req, res) => {
  const { id } = req.params;

  await Daily.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });

  req.flash("success", "Daily Record Deleted!");
  res.redirect("/daily");
};
