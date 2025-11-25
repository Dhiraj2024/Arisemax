const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressEroor");
const { idolSchema } = require("../schema");

const idolController = require("../controllers/idol");

// Validation
const validateListing = (req, res, next) => {
  let { error } = idolSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(404, errMsg);
  }
  next();
};

// INDEX + CREATE
router.route("/")
  .get(isLoggedIn, wrapAsync(idolController.index))
  .post(
    isLoggedIn,
    upload.single("idol[image]"),
    validateListing,
    wrapAsync(idolController.createIdol)
  );

// NEW FORM
router.get("/new", isLoggedIn, idolController.renderNewForm);

// EDIT FORM
router.get("/:id/edit", isLoggedIn, wrapAsync(idolController.renderEditForm));

// UPDATE
router.put(
  "/:id",
  isLoggedIn,
  upload.single("idol[image]"),
  validateListing,
  wrapAsync(idolController.updateIdol)
);

// DELETE
router.delete("/:id", isLoggedIn, wrapAsync(idolController.deleteIdol));

module.exports = router;
