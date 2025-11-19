const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { dailySchema } = require("../schema.js");
const Daily = require("../models/daily.js");
const { isLoggedIn } = require("../middleware");

const validateListing = (req,res,next) => {
 let {error} =  dailySchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};



router.get("/", isLoggedIn, async (req, res) => {
  const allDaily = await Daily.find({ owner: req.user._id });
  res.render("listings/dailyindex", { allDaily });
});
//Created save Route
router.post(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const newDaily = new Daily(req.body.daily);
    newDaily.owner = req.user._id; // ⭐ Important
    await newDaily.save();
    res.redirect("/daily");
  })
);
//mortnew---
router.get("/new",isLoggedIn, (req, res) => {
  res.render("listings/dailyadd");
});

//Edit Route
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  const daily = await Daily.findOne({ _id: id, owner: req.user._id }); // ⭐ owner check

  if (!daily) {
    req.flash("error", "You are not allowed!");
    return res.redirect("/daily");
  }

  res.render("listings/dailyedit", { daily });
});

//Update Route
router.put("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;

  await Daily.findOneAndUpdate(
    { _id: id, owner: req.user._id }, // ⭐ owner check
    { ...req.body.daily }
  );

  res.redirect("/daily");
});

//Delete Route
router.delete("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  await Daily.findOneAndDelete({
    _id: id,
    owner: req.user._id, // ⭐ only owner delete
  });
  res.redirect("/daily");
});

module.exports = router;