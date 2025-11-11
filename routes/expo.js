const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { expoSchema } = require("../schema.js");
const Expo = require("../models/expo.js");


const validateListing = (req,res,next) => {
 let {error} =  expoSchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};


router.get("/",async(req, res) => {
    const allExpo = await Expo.find({});
     res.render("listings/expoindex",{allExpo});
});
//Created save Route
router.post("/", wrapAsync(async (req, res) => {
  const newExpo = new Expo(req.body.expo);
  await newExpo.save();
  req.flash("success","New Journey has Started...");
  res.redirect("/expo");
//   res.redirect("listings/gotindex");
}));
//mortnew---
router.get("/new", (req, res) => {
  res.render("listings/expoadd");
});

//Edit Route
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const expo = await Expo.findById(id);
  res.render("listings/expoedit.ejs", { expo });
});

//Update Route
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  await Expo.findByIdAndUpdate(id, { ...req.body.expo});
  res.redirect(`/expo`);
});

//Delete Route
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deletedExpo = await Expo.findByIdAndDelete(id);
  console.log(deletedExpo);
  res.redirect("/expo");
});


module.exports = router;