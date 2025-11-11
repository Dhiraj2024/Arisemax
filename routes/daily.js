const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { dailySchema } = require("../schema.js");
const Daily = require("../models/daily.js");


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



router.get("/",async(req, res) => {
    const allDaily = await Daily.find({});
     res.render("listings/dailyindex",{allDaily});
});
//Created save Route
router.post("/", wrapAsync(async (req, res) => {
  const newDaily = new Daily(req.body.daily);
  await newDaily.save();
  res.redirect("/daily");
//   res.redirect("listings/mortindex");
}));
//mortnew---
router.get("/new", (req, res) => {
  res.render("listings/dailyadd");
});

//Edit Route
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const daily = await Daily.findById(id);
  res.render("listings/dailyedit.ejs", { daily });
});

//Update Route
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  await Daily.findByIdAndUpdate(id, { ...req.body.daily});
  res.redirect(`/daily`);
});

//Delete Route
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deletedDaily = await Daily.findByIdAndDelete(id);
  console.log(deletedDaily);
  res.redirect("/daily");
});





module.exports = router;