// controllers/idol.js
const Idol = require("../models/idol");

// ------------------ INDEX (OWNER ONLY) ------------------
module.exports.index = async (req, res) => {
  const allIdol = await Idol.find({ owner: req.user._id });
  res.render("listings/idolindex", { allIdol });
};

// ------------------ NEW FORM ------------------
module.exports.renderNewForm = (req, res) => {
  res.render("listings/idoladd");
};

// ------------------ CREATE ------------------
module.exports.createIdol = async (req, res) => {
  const newIdol = new Idol(req.body.idol);

  if (req.file) {
    newIdol.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  newIdol.owner = req.user._id; // ⭐ owner attach
  await newIdol.save();

  req.flash("success", "New Idol Added!");
  res.redirect("/idol");
};

// ------------------ EDIT FORM ------------------
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;

  const idol = await Idol.findOne({ _id: id, owner: req.user._id }); // ⭐ Owner verify

  if (!idol) {
    req.flash("error", "Not allowed!");
    return res.redirect("/idol");
  }

  res.render("listings/idoledit", { idol });
};

// ------------------ UPDATE ------------------
module.exports.updateIdol = async (req, res) => {
  const { id } = req.params;

  const updatedIdol = await Idol.findOneAndUpdate(
    { _id: id, owner: req.user._id }, // ⭐ owner check
    { ...req.body.idol }
  );

  if (req.file) {
    updatedIdol.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await updatedIdol.save();
  }

  req.flash("success", "Idol Updated!");
  res.redirect("/idol");
};

// ------------------ DELETE ------------------
module.exports.deleteIdol = async (req, res) => {
  const { id } = req.params;

  await Idol.findOneAndDelete({
    _id: id,
    owner: req.user._id, // ⭐ owner check
  });

  req.flash("success", "Idol Deleted!");
  res.redirect("/idol");
};
