const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { knowSchema } = require("../schema.js");
const Know = require("../models/know.js");


const validateListing = (req,res,next) => {
 let {error} =  knowSchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};


router.get("/",async(req, res) => {
    const allKnow = await Know.find({});
     res.render("listings/knowindex",{allKnow});
});
//Created save Route
router.post("/", wrapAsync(async (req, res) => {
  const newKnow = new Know(req.body.know);
  await newKnow.save();
  res.redirect("/know");
//   res.redirect("listings/gotindex");
}));
//mortnew---
router.get("/new", (req, res) => {
  res.render("listings/knowadd");
});

//Edit Route
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const know = await Know.findById(id);
  res.render("listings/knowedit.ejs", { know });
});

//Update Route
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  await Know.findByIdAndUpdate(id, { ...req.body.know});
  res.redirect(`/know`);
});

//Delete Route
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deletedKnow = await Know.findByIdAndDelete(id);
  console.log(deletedKnow);
  res.redirect("/know");
});


module.exports = router;