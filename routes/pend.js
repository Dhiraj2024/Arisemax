const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressEroor");
const { pendSchema } = require("../schema");
const { isLoggedIn } = require("../middleware");
const pendController = require("../controllers/pend");

// Validation
const validateListing = (req, res, next) => {
  let { error } = pendSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, msg);
  } else {
    next();
  }
};

// INDEX
router.get("/", isLoggedIn, wrapAsync(pendController.index));

// NEW FORM
router.get("/new", isLoggedIn, pendController.renderNewForm);

// CREATE
router.post("/", isLoggedIn, validateListing, wrapAsync(pendController.createPend));

// DELETE
router.delete("/:id", isLoggedIn, wrapAsync(pendController.deletePend));

module.exports = router;
