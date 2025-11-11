const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { mortSchema } = require("../schema.js");
const Mort = require("../models/mortgage.js");


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
router.get("/",async(req, res) => {
    const allMort = await Mort.find({});
     res.render("listings/mortindex",{allMort});
});
//Created save Route
router.post("/", wrapAsync(async (req, res) => {
  const newMort = new Mort(req.body.mort);
  await newMort.save();
  req.flash("success","New Pain is created...");
  res.redirect("/mort");
//   res.redirect("listings/mortindex");
}));
//mortnew---
router.get("/new", (req, res) => {
  res.render("listings/mortadd");
});

//Edit Route
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const mort = await Mort.findById(id);
  res.render("listings/mortedit.ejs", { mort });
});

//Update Route
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  await Mort.findByIdAndUpdate(id, { ...req.body.mort });
  res.redirect(`/mort`);
});

//Delete Route
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deletedMort = await Mort.findByIdAndDelete(id);
  console.log(deletedMort);
  res.redirect("/mort");
});


module.exports = router;