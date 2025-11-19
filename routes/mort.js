const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { mortSchema } = require("../schema.js");
const Mort = require("../models/mortgage.js");
const { isLoggedIn } = require("../middleware");

const validateListing = (req,res,next) => {
 let {error} =  mortSchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};


//Mortindex
router.get("/", isLoggedIn,async(req, res) => {
    const allMort = await Mort.find({ owner: req.user._id });
     res.render("listings/mortindex",{ allMort });
});
//Created save Route
router.post("/", wrapAsync(async (req, res) => {
  const newMort = new Mort(req.body.mort);
    newMort.owner = req.user._id;        // ⭐ Important
  await newMort.save();
  req.flash("success","New Pain is created...");
  res.redirect("/mort");
//   res.redirect("listings/mortindex");
}));
//mortnew---
router.get("/new",isLoggedIn, (req, res) => {
  res.render("listings/mortadd");
});

//Edit Route
router.get("/:id/edit", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const mort = await Mort.findOne({ _id: id, owner: req.user._id });// check
  if (!mort) return res.redirect("/mort");
  res.render("listings/mortedit", { mort });
});

//Update Route
router.put("/:id", async (req, res) => {
  let { id } = req.params;

    await Mort.findOneAndUpdate(
      { _id: id, owner: req.user._id },   // ⭐ owner check
      { ...req.body.Mort }
    );

  res.redirect(`/mort`);
});

//Delete Route
router.delete("/:id", isLoggedIn,async (req, res) => {
  let { id } = req.params;
    await Mort.findOneAndDelete({_id: id, owner: req.user._id});
  res.redirect("/mort");
});

module.exports = router;