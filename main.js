// ========================= ENVIRONMENT CONFIG =========================
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
console.log("SESSION_SECRE:", process.env.SECRET);


const MongoStore = require("connect-mongo");

// ========================= IMPORTS =========================
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const multer = require('multer');
const { cloudinary ,storage } = require("./cloudConfig.js");
const upload = multer({ storage });

const User = require("./models/user");
const Arise = require("./models/arise.js");

// Routes
const mort = require("./routes/mort");
const afr = require("./routes/afr");
const pend = require("./routes/pend");
const daily = require("./routes/daily");
const go = require("./routes/go");
const expo = require("./routes/expo");
const know = require("./routes/know");
const idol = require("./routes/idol");
const userRouter = require("./routes/user");
const adminRoutes = require("./routes/admin");

// Utilities
const ExpressError = require("./utils/ExpressEroor.js");
const wrapAsync = require("./utils/wrapAsync.js");

// MongoDB connection string
//const MONGO_URL = "mongodb://127.0.0.1:27017/Arisemax";
const MONGO_URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Arisemax";
console.log("Using Mongo URL:", MONGO_URL);
// ========================= APP CONFIG =========================
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // for CSS/JS/images

// ========================= SESSION CONFIG =========================
const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: { secret: process.env.SESSION_SECRET },
    touchAfter: 24 * 3600
});

const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};
app.use(session(sessionOptions));
app.use(cookieParser("secretcode"));
app.use(flash());

// ========================= PASSPORT CONFIG =========================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========================= GLOBAL MIDDLEWARE =========================
app.use((req, res, next) => {
    res.locals.currentUser = req.user;           // Passport user available in all EJS
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

// ========================= DATABASE CONNECT =========================
main()
    .then(() => console.log("MongoDB connection successful"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

// ========================= VALIDATION MIDDLEWARE =========================
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(404, errMsg);
    } else {
        next();
    }
};

// ========================= ROUTES =========================

// ---- Home Page ----
app.get("/", (req, res) => {
    res.render("listings/home.ejs");
});

// ---- Mortgage ----
app.use("/mort", mort);

// ---- Affirmation ----
app.use("/afr", afr);

// ---- Pending ----
app.use("/pend", pend);

// ---- Daily Aims ----
app.use("/daily", daily);

// ---- Goal ----
app.use("/go", go);

// ---- Know ----
app.use("/know", know);

// ---- Idol ----
app.use("/idol", idol);

// ---- Explore ----
app.use("/expo", expo);

// ---- User Auth ----
app.use("/", userRouter);

// ---- Arise ----
app.get("/arise", async (req, res) => {
    const allArise = await Arise.find({});
    res.render("listings/ariseindex", { allArise });
});

// ---- Admin ----
app.use("/", adminRoutes);

// ========================= ERROR HANDLING =========================
app.use((req, res, next) => {  
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    if (res.headersSent) return next(err);
    res.status(statusCode).render("error.ejs", { err, message });
});

// ========================= SERVER =========================
app.listen(8090, () => {
    console.log(`Server is running on port 8090`);
});
