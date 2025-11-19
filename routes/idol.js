const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { idolSchema } = require("../schema.js");
const Idol = require("../models/idol.js");

// Validation
const validateListing = (req, res, next) => {
  let { error } = idolSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

// ------------------ INDEX (ONLY OWNER DATA) ------------------
router.get("/", isLoggedIn, async (req, res) => {
  const allIdol = await Idol.find({ owner: req.user._id });
  res.render("listings/idolindex", { allIdol });
});

// ------------------ CREATE ------------------
router.post(
  "/",
  isLoggedIn,
  upload.single("idol[image]"),
  wrapAsync(async (req, res) => {
    const newIdol = new Idol(req.body.idol);

    // File upload image
    if (req.file) {
      const { path, filename } = req.file;
      newIdol.image = { url: path, filename };
    }

    newIdol.owner = req.user._id; // ⭐ important
    await newIdol.save();

    res.redirect("/idol");
  })
);

// ------------------ NEW FORM ------------------
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/idoladd");
});

// ------------------ EDIT ------------------
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  const idol = await Idol.findOne({ _id: id, owner: req.user._id }); // owner check

  if (!idol) {
    req.flash("error", "Not allowed!");
    return res.redirect("/idol");
  }

  res.render("listings/idoledit", { idol });
});

// ------------------ UPDATE ------------------
router.put(
  "/:id",
  isLoggedIn,
  upload.single("idol[image]"),
  async (req, res) => {
    const { id } = req.params;

    const updatedIdol = await Idol.findOneAndUpdate(
      { _id: id, owner: req.user._id }, // owner check
      { ...req.body.idol }
    );

    if (req.file) {
      updatedIdol.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
      await updatedIdol.save();
    }

    res.redirect("/idol");
  }
);

// ------------------ DELETE ------------------
router.delete("/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  await Idol.findOneAndDelete({
    _id: id,
    owner: req.user._id, // owner check
  });

  res.redirect("/idol");
});

module.exports = router;
