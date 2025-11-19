const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { goSchema } = require("../schema.js");
const Go = require("../models/go.js");
const { isLoggedIn } = require("../middleware");

// Validate
const validateListing = (req, res, next) => {
  let { error } = goSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

// INDEX - sirf current user ke goals dikhaye
router.get("/", isLoggedIn, async (req, res) => {
  const allGo = await Go.find({ owner: req.user._id });// ⭐ Important
  res.render("listings/goindex", { allGo });
});

// CREATE - owner attach
router.post("/", isLoggedIn, wrapAsync(async (req, res) => {
  const newGo = new Go(req.body.go);
  newGo.owner = req.user._id;        // ⭐ Important
  await newGo.save();
   req.flash("success","New Goal has added...");
  res.redirect("/go");
}));

// NEW
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/goadd");
});

// EDIT - sirf owner
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  const go = await Go.findOne({ _id: id, owner: req.user._id }); 

  if (!go) {
    req.flash("error", "Not allowed!");
    return res.redirect("/go");
  }

  res.render("listings/goedit", { go });
});

// UPDATE - owner only
router.put("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;

  await Go.findOneAndUpdate(
    { _id: id, owner: req.user._id },   // ⭐ owner check
    { ...req.body.go }
  );

  res.redirect("/go");
});

// DELETE - owner only
router.delete("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;

  await Go.findOneAndDelete({   // ⭐ owner check
    _id: id,
    owner: req.user._id
  });

  res.redirect("/go");
});

module.exports = router;
