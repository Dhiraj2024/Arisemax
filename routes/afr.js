// routes/afr.js
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { afrSchema } = require("../schema.js");
const { isLoggedIn } = require("../middleware");
const afrController = require("../controllers/afr");

// JOI Validation
const validateListing = (req, res, next) => {
  const { error } = afrSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// INDEX + CREATE
router
  .route("/")
  .get(wrapAsync(afrController.index))
  .post(
    isLoggedIn,
    validateListing,
    wrapAsync(afrController.createAfr)
  );

// NEW FORM
router.get("/new", isLoggedIn, afrController.renderNewForm);

// EDIT FORM
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(afrController.renderEditForm)
);

// UPDATE
router.put(
  "/:id",
  isLoggedIn,
  validateListing,
  wrapAsync(afrController.updateAfr)
);

// DELETE
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(afrController.deleteAfr)
);

module.exports = router;
