const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { goSchema } = require("../schema.js");
const Go = require("../models/go.js");


const validateListing = (req,res,next) => {
 let {error} =  goSchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};


router.get("/",async(req, res) => {
    const allGo = await Go.find({});
     res.render("listings/goindex",{allGo});
});
//Created save Route
router.post("/", wrapAsync(async (req, res) => {
  const newGo = new Go(req.body.go);
  await newGo.save();
  res.redirect("/go");
//   res.redirect("listings/gotindex");
}));
//mortnew---
router.get("/new", (req, res) => {
  res.render("listings/goadd");
});

//Edit Route
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const go = await Go.findById(id);
  res.render("listings/goedit.ejs", { go });
});

//Update Route
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  await Go.findByIdAndUpdate(id, { ...req.body.go});
  res.redirect(`/go`);
});

//Delete Route
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deletedGo = await Go.findByIdAndDelete(id);
  console.log(deletedGo);
  res.redirect("/go");
});


module.exports = router;