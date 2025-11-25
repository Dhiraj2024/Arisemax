const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressEroor");
const { goSchema } = require("../schema");
const { isLoggedIn } = require("../middleware");
const goController = require("../controllers/go");

// Validate
const validateListing = (req, res, next) => {
  let { error } = goSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(404, errMsg);
  }
  next();
};

// INDEX + CREATE
router
  .route("/")
  .get(isLoggedIn, wrapAsync(goController.index))
  .post(
    isLoggedIn,
    validateListing,
    wrapAsync(goController.createGo)
  );

// NEW
router.get("/new", isLoggedIn, goController.renderNewForm);

// EDIT
router.get("/:id/edit", isLoggedIn, wrapAsync(goController.renderEditForm));

// UPDATE
router.put(
  "/:id",
  isLoggedIn,
  validateListing,
  wrapAsync(goController.updateGo)
);

// DELETE
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(goController.deleteGo)
);

module.exports = router;
