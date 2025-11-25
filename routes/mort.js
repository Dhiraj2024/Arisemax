const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressEroor");
const { mortSchema } = require("../schema");
const { isLoggedIn } = require("../middleware");
const mortController = require("../controllers/mort");

// Validation
const validateListing = (req, res, next) => {
  let { error } = mortSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, msg);
  } else {
    next();
  }
};

// INDEX
router.get("/", isLoggedIn, wrapAsync(mortController.index));

// NEW FORM
router.get("/new", isLoggedIn, mortController.renderNewForm);

// CREATE
router.post("/", isLoggedIn, validateListing, wrapAsync(mortController.createMort));

// EDIT FORM
router.get("/:id/edit", isLoggedIn, wrapAsync(mortController.renderEditForm));

// UPDATE
router.put("/:id", isLoggedIn, validateListing, wrapAsync(mortController.updateMort));

// DELETE
router.delete("/:id", isLoggedIn, wrapAsync(mortController.deleteMort));

module.exports = router;
