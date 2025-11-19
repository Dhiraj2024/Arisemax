const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { knowSchema } = require("../schema.js");
const Know = require("../models/know.js");
const { isLoggedIn } = require("../middleware");

// ------------------ Validation ------------------
const validateListing = (req, res, next) => {
  let { error } = knowSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

// ------------------ INDEX (ONLY LOGGED USER DATA) ------------------
router.get("/", isLoggedIn, async (req, res) => {
  const allKnow = await Know.find({ owner: req.user._id }); // ⭐ important
  res.render("listings/knowindex", { allKnow });
});

// ------------------ CREATE ------------------
router.post(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const newKnow = new Know(req.body.know);
    newKnow.owner = req.user._id; // ⭐ owner add

    await newKnow.save();
    res.redirect("/know");
  })
);

// ------------------ NEW FORM ------------------
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/knowadd");
});

// ------------------ EDIT ------------------
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  const know = await Know.findOne({
    _id: id,
    owner: req.user._id, // ⭐ owner check
  });

  if (!know) {
    req.flash("error", "Not allowed!");
    return res.redirect("/know");
  }

  res.render("listings/knowedit", { know });
});

// ------------------ UPDATE ------------------
router.put("/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  await Know.findOneAndUpdate(
    { _id: id, owner: req.user._id }, // ⭐ owner check
    { ...req.body.know }
  );

  res.redirect("/know");
});

// ------------------ DELETE ------------------
router.delete("/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  await Know.findOneAndDelete({
    _id: id,
    owner: req.user._id, // ⭐ owner check
  });

  res.redirect("/know");
});

module.exports = router;
