const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressEroor");
const { knowSchema } = require("../schema");
const { isLoggedIn } = require("../middleware");
const knowController = require("../controllers/know");

// Validation
const validateListing = (req, res, next) => {
  let { error } = knowSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

// INDEX
router.get("/", isLoggedIn, wrapAsync(knowController.index));

// NEW
router.get("/new", isLoggedIn, knowController.renderNewForm);

// CREATE
router.post("/", isLoggedIn, validateListing, wrapAsync(knowController.createKnow));

// EDIT FORM
router.get("/:id/edit", isLoggedIn, wrapAsync(knowController.renderEditForm));

// UPDATE
router.put("/:id", isLoggedIn, validateListing, wrapAsync(knowController.updateKnow));

// DELETE
router.delete("/:id", isLoggedIn, wrapAsync(knowController.deleteKnow));

module.exports = router;
