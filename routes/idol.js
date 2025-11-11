const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressEroor.js");
const { idolSchema } = require("../schema.js");
const Idol = require("../models/idol.js");


const validateListing = (req,res,next) => {
 let {error} =  idolSchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};



router.get("/",async(req, res) => {
    const allIdol = await Idol.find({});
     res.render("listings/idolindex",{allIdol});
});
//Created save Route
router.post(
  "/",
  upload.single("idol[image]"),
  wrapAsync(async (req, res) => {
    console.log("📦 Uploaded File:", req.file);
    // Cloudinary se image info aati hai:
    const { path, filename } = req.file;

    const newIdol = new Idol(req.body.idol);
    newIdol.image = { url: path, filename };

    await newIdol.save();

    console.log("✅ Idol saved:", newIdol);
    res.redirect("/idol");
  })
);

//idolnew---
router.get("/new", (req, res) => {
  res.render("listings/idoladd");
});

//Edit Route
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  const idol = await Idol.findById(id);
  res.render("listings/idoledit.ejs", { idol });
});

//Update Route
router.put("/:id", async (req, res) => {
  let { id } = req.params;
  await Idol.findByIdAndUpdate(id, { ...req.body.idol});
  res.redirect(`/idol`);
});

//Delete Route
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  let deletedIdol = await Idol.findByIdAndDelete(id);
  console.log(deletedIdol);
  res.redirect("/idol");
});



module.exports = router;