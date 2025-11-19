const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { pendSchema } = require("../schema.js");
const Pend = require("../models/pend.js");
const { isLoggedIn } = require("../middleware");

// Validate
const validateListing = (req, res, next) => {
  let { error } = pendSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

// INDEX (ONLY LOGGED USER DATA)
router.get("/", isLoggedIn, async (req, res) => {
  const allPend = await Pend.find({ owner: req.user._id });
  res.render("listings/pendindex", { allPend });
});

// CREATE
router.post(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const newPend = new Pend(req.body.pend);
    newPend.owner = req.user._id;

    await newPend.save();
    req.flash("success", "New task added...");
    res.redirect("/pend");
  })
);

// NEW FORM
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/pendadd");
});

// DELETE
router.delete("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;

  await Pend.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });

  res.redirect("/pend");
});

module.exports = router;
