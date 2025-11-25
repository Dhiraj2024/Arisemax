const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { dailySchema } = require("../schema.js");
const { isLoggedIn } = require("../middleware");
const dailyController = require("../controllers/daily");

// JOI validation
const validateListing = (req, res, next) => {
  let { error } = dailySchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(404, errMsg);
  }
  next();
};

// INDEX + CREATE
router
  .route("/")
  .get(isLoggedIn, wrapAsync(dailyController.index))
  .post(
    isLoggedIn,
    validateListing,
    wrapAsync(dailyController.createDaily)
  );

// NEW FORM
router.get("/new", isLoggedIn, dailyController.renderNewForm);

// EDIT FORM
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(dailyController.renderEditForm)
);

// UPDATE
router.put(
  "/:id",
  isLoggedIn,
  validateListing,
  wrapAsync(dailyController.updateDaily)
);

// DELETE
router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(dailyController.deleteDaily)
);

module.exports = router;
