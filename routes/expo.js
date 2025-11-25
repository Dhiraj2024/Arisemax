const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { expoSchema } = require("../schema.js");
const { isLoggedIn } = require("../middleware");
const expoController = require("../controllers/expo");

// JOI Validation
const validateListing = (req, res, next) => {
  let { error } = expoSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  }
  next();
};

// INDEX + CREATE
router
  .route("/")
  .get(wrapAsync(expoController.index))
  .post(
    isLoggedIn,
    validateListing,
    wrapAsync(expoController.createExpo)
  );

// NEW FORM
router.get("/new", isLoggedIn, expoController.renderNewForm);

// EDIT FORM
router.get("/:id/edit", isLoggedIn, wrapAsync(expoController.renderEditForm));

// UPDATE ROUTE
router.put(
  "/:id",
  isLoggedIn,
  validateListing,
  wrapAsync(expoController.updateExpo)
);

// DELETE ROUTE
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(expoController.deleteExpo)
);

module.exports = router;
