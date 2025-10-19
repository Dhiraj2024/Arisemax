const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Mort = require("./models/mortgage.js");
const Afr = require("./models/afr.js");
const Daily = require("./models/daily.js");
const Know = require("./models/know.js");
const Go = require("./models/go.js");
const Idol = require("./models/idol.js");
const Expo = require("./models/expo.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressEroor.js");
const wrapAsync = require("./utils/wrapAsync.js");

const MONGO_URL="mongodb://127.0.0.1:27017/Arisemax";   

app.use(express.static(path.join(__dirname, "public")));//for css
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()
 app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

main()
.then(() => {
console.log("connection successfull");
})
.catch(err => {
    console.log(err);
});

async function main() {
 await  mongoose.connect(MONGO_URL);   
}


const validateListing = (req,res,next) => {
 let {error} =  listingSchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};

//----Home------
app.get("/", (req, res) => {
     res.render("listings/home.ejs");
});
//Mortindex
app.get("/mort",async(req, res) => {
    const allMort = await Mort.find({});
     res.render("listings/mortindex",{allMort});
});
//Created save Route
app.post("/mort", wrapAsync(async (req, res) => {
  const newMort = new Mort(req.body.mort);
  await newMort.save();
  res.redirect("/mort");
//   res.redirect("listings/mortindex");
}));
//mortnew---
app.get("/mort/new", (req, res) => {
  res.render("listings/mortadd");
});

//Edit Route
app.get("/mort/:id/edit", async (req, res) => {
  let { id } = req.params;
  const mort = await Mort.findById(id);
  res.render("listings/mortedit.ejs", { mort });
});

//Update Route
app.put("/mort/:id", async (req, res) => {
  let { id } = req.params;
  await Mort.findByIdAndUpdate(id, { ...req.body.mort });
  res.redirect(`/mort`);
});

//Delete Route
app.delete("/mort/:id", async (req, res) => {
  let { id } = req.params;
  let deletedMort = await Mort.findByIdAndDelete(id);
  console.log(deletedMort);
  res.redirect("/mort");
});

////////////////////AFFERMATION////////////////////////
//////////////////////////////////////////////////
//Afrindex
app.get("/afr",async(req, res) => {
    const allAfr = await Afr.find({});
     res.render("listings/afrindex",{allAfr});
});
//Created save Route
app.post("/afr", wrapAsync(async (req, res) => {
  const newAfr = new Afr(req.body.afr);
  await newAfr.save();
  res.redirect("/afr");
//   res.redirect("listings/mortindex");
}));
//mortnew---
app.get("/afr/new", (req, res) => {
  res.render("listings/afradd");
});

//Edit Route
app.get("/afr/:id/edit", async (req, res) => {
  let { id } = req.params;
  const afr = await Afr.findById(id);
  res.render("listings/afredit.ejs", { afr });
});

//Update Route
app.put("/afr/:id", async (req, res) => {
  let { id } = req.params;
  await Afr.findByIdAndUpdate(id, { ...req.body.afr});
  res.redirect(`/afr`);
});

//Delete Route
app.delete("/afr/:id", async (req, res) => {
  let { id } = req.params;
  let deletedAfr = await Afr.findByIdAndDelete(id);
  console.log(deletedAfr);
  res.redirect("/afr");
});


////////////////////Daily Aims////////////////////////
//////////////////////////////////////////////////

app.get("/daily",async(req, res) => {
    const allDaily = await Daily.find({});
     res.render("listings/dailyindex",{allDaily});
});
//Created save Route
app.post("/daily", wrapAsync(async (req, res) => {
  const newDaily = new Daily(req.body.daily);
  await newDaily.save();
  res.redirect("/daily");
//   res.redirect("listings/mortindex");
}));
//mortnew---
app.get("/daily/new", (req, res) => {
  res.render("listings/dailyadd");
});

//Edit Route
app.get("/daily/:id/edit", async (req, res) => {
  let { id } = req.params;
  const daily = await Daily.findById(id);
  res.render("listings/dailyedit.ejs", { daily });
});

//Update Route
app.put("/daily/:id", async (req, res) => {
  let { id } = req.params;
  await Daily.findByIdAndUpdate(id, { ...req.body.daily});
  res.redirect(`/daily`);
});

//Delete Route
app.delete("/daily/:id", async (req, res) => {
  let { id } = req.params;
  let deletedDaily = await Daily.findByIdAndDelete(id);
  console.log(deletedDaily);
  res.redirect("/daily");
});

////////////////////Goal////////////////////////
//////////////////////////////////////////////////

app.get("/go",async(req, res) => {
    const allGo = await Go.find({});
     res.render("listings/goindex",{allGo});
});
//Created save Route
app.post("/go", wrapAsync(async (req, res) => {
  const newGo = new Go(req.body.go);
  await newGo.save();
  res.redirect("/go");
//   res.redirect("listings/gotindex");
}));
//mortnew---
app.get("/go/new", (req, res) => {
  res.render("listings/goadd");
});

//Edit Route
app.get("/go/:id/edit", async (req, res) => {
  let { id } = req.params;
  const go = await Go.findById(id);
  res.render("listings/goedit.ejs", { go });
});

//Update Route
app.put("/go/:id", async (req, res) => {
  let { id } = req.params;
  await Go.findByIdAndUpdate(id, { ...req.body.go});
  res.redirect(`/go`);
});

//Delete Route
app.delete("/go/:id", async (req, res) => {
  let { id } = req.params;
  let deletedGo = await Go.findByIdAndDelete(id);
  console.log(deletedGo);
  res.redirect("/go");
});

////////////////////Know////////////////////////
//////////////////////////////////////////////////

app.get("/know",async(req, res) => {
    const allKnow = await Know.find({});
     res.render("listings/knowindex",{allKnow});
});
//Created save Route
app.post("/know", wrapAsync(async (req, res) => {
  const newGo = new Know(req.body.know);
  await newKnow.save();
  res.redirect("/know");
//   res.redirect("listings/gotindex");
}));
//mortnew---
app.get("/know/new", (req, res) => {
  res.render("listings/knowadd");
});

//Edit Route
app.get("/know/:id/edit", async (req, res) => {
  let { id } = req.params;
  const know = await Know.findById(id);
  res.render("listings/knowedit.ejs", { know });
});

//Update Route
app.put("/know/:id", async (req, res) => {
  let { id } = req.params;
  await Know.findByIdAndUpdate(id, { ...req.body.know});
  res.redirect(`/know`);
});

//Delete Route
app.delete("/know/:id", async (req, res) => {
  let { id } = req.params;
  let deletedKnow = await Know.findByIdAndDelete(id);
  console.log(deletedKnow);
  res.redirect("/know");
});



///////////////////IDOLS////////////////////////
//////////////////////////////////////////////////

app.get("/idol",async(req, res) => {
    const allIdol = await Idol.find({});
     res.render("listings/idolindex",{allIdol});
});
//Created save Route
app.post("/idol", wrapAsync(async (req, res) => {
  const newIdol = new Idol(req.body.idol);
  await newIdol.save();
  res.redirect("/idol");
//   res.redirect("listings/gotindex");
}));
//mortnew---
app.get("/idol/new", (req, res) => {
  res.render("listings/idoladd");
});

//Edit Route
app.get("/idol/:id/edit", async (req, res) => {
  let { id } = req.params;
  const idol = await Idol.findById(id);
  res.render("listings/idoledit.ejs", { idol });
});

//Update Route
app.put("/idol/:id", async (req, res) => {
  let { id } = req.params;
  await Idol.findByIdAndUpdate(id, { ...req.body.idol});
  res.redirect(`/idol`);
});

//Delete Route
app.delete("/idol/:id", async (req, res) => {
  let { id } = req.params;
  let deletedIdol = await Idol.findByIdAndDelete(id);
  console.log(deletedIdol);
  res.redirect("/idol");
});


///////////////////EXPLOREEE////////////////////////
//////////////////////////////////////////////////

app.get("/expo",async(req, res) => {
    const allExpo = await Expo.find({});
     res.render("listings/expoindex",{allExpo});
});
//Created save Route
app.post("/expo", wrapAsync(async (req, res) => {
  const newExpo = new Expo(req.body.expo);
  await newExpo.save();
  res.redirect("/expo");
//   res.redirect("listings/gotindex");
}));
//mortnew---
app.get("/expo/new", (req, res) => {
  res.render("listings/expoadd");
});

//Edit Route
app.get("/expo/:id/edit", async (req, res) => {
  let { id } = req.params;
  const expo = await Expo.findById(id);
  res.render("listings/expoedit.ejs", { expo });
});

//Update Route
app.put("/expo/:id", async (req, res) => {
  let { id } = req.params;
  await Expo.findByIdAndUpdate(id, { ...req.body.expo});
  res.redirect(`/expo`);
});

//Delete Route
app.delete("/expo/:id", async (req, res) => {
  let { id } = req.params;
  let deletedExpo = await Expo.findByIdAndDelete(id);
  console.log(deletedExpo);
  res.redirect("/expo");
});




app.use((req, res, next) => {  //hum apna custom error de sake 
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  if (res.headersSent) {   //isliye likja taki bahar se koi  operation perform kara de 
    return next(err);
  }
  res.status(statusCode).render("error.ejs", { err, message });
});

app.listen(8090, () => {
    console.log(`app is listening on port 8090`);
});


