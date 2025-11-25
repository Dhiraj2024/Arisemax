// controllers/go.js
const Go = require("../models/go");

// INDEX - Only logged-in user's goals
module.exports.index = async (req, res) => {
  const allGo = await Go.find({ owner: req.user._id });
  res.render("listings/goindex", { allGo });
};

// NEW form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/goadd");
};

// CREATE - Add new goal
module.exports.createGo = async (req, res) => {
  const newGo = new Go(req.body.go);
  newGo.owner = req.user._id;
  await newGo.save();

  req.flash("success", "New Goal has added...");
  res.redirect("/go");
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const go = await Go.findOne({ _id: id, owner: req.user._id });

  if (!go) {
    req.flash("error", "Not allowed!");
    return res.redirect("/go");
  }

  res.render("listings/goedit", { go });
};

// UPDATE
module.exports.updateGo = async (req, res) => {
  const { id } = req.params;

  await Go.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    { ...req.body.go }
  );

  req.flash("success", "Goal updated!");
  res.redirect("/go");
};

// DELETE
module.exports.deleteGo = async (req, res) => {
  const { id } = req.params;

  await Go.findOneAndDelete({
    _id: id,
    owner: req.user._id
  });

  req.flash("success", "Goal deleted!");
  res.redirect("/go");
};
