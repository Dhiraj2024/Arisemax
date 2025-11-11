const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { afrSchema } = require("../schema.js");
const Afr = require("../models/afr.js");


const validateListing = (req,res,next) => {
 let {error} =  afrSchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};

//Afrindex
router.get("/",async(req, res) => {
    const allAfr = await Afr.find({});
     res.render("listings/afrindex",{allAfr});
});
//Created save Route
router.post("/", wrapAsync(async (req, res) => {
  const newAfr = new Afr(req.body.afr);
  await newAfr.save();
  res.redirect("/afr");
//   res.redirect("listings/mortindex");
}));
//mortnew---
router.get("/new", (req, res) => {
  res.render("listings/afradd");
});

//Edit Route
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const afr = await Afr.findById(id);
  res.render("listings/afredit.ejs", { afr });
});

//Update Route
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  await Afr.findByIdAndUpdate(id, { ...req.body.afr});
  res.redirect(`/afr`);
});

//Delete Route
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deletedAfr = await Afr.findByIdAndDelete(id);
  console.log(deletedAfr);
  res.redirect("/afr");
});



module.exports = router;