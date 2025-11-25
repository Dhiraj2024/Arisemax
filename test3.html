const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { afrSchema } = require("../schema.js");
const Afr = require("../models/afr.js");
const { isLoggedIn } = require("../middleware");

const validateListing = (req, res, next) => {
  let { error } = afrSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

// Afr Index Route
router.get("/", async (req, res) => {
  const allAfr = await Afr.find({}).populate("owner");
  res.render("listings/afrindex", { allAfr });
});

// Create Route
router.post("/", isLoggedIn, wrapAsync(async (req, res) => {
  const newAfr = new Afr(req.body.afr);
  newAfr.owner = req.user._id;
  await newAfr.save();
    req.flash("success","New Couse has added...");
  res.redirect("/afr");
}));

// New Form
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/afradd");
});

// Edit Route
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  const afr = await Afr.findById(id).populate("owner");
  res.render("listings/afredit", { afr });
});

// Update Route
router.put("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  await Afr.findByIdAndUpdate(id, { ...req.body.afr });
  res.redirect("/afr");
});

// Delete Route
router.delete("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  await Afr.findByIdAndDelete(id);
  res.redirect("/afr");
});

module.exports = router;
