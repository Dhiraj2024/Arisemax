const Mort = require("./models/mortgage.js");
const ExpressError = require("./utils/ExpressEroor.js");
const { mortSchema} = require("./schema.js");

// const Afr = require("./models/afr.js");
//its for redirect my operation
module.exports.isLoggedIn = (req, res, next) => {
        if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged into create.");
        return res.redirect("/login");
  }
  next();    
};
//it saves the redirection
module.exports.saveRedirectUrl = (req, res ,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.validateMort = (req,res,next) => {
 let {error} =  mortSchema.validate(req.body);
//  console.log(result); 
 if(error){
    let errMsg = error.details.map((el)=> el.message).join(",");
  throw new ExpressError(404, errMsg);
 }else{
    next();
 }
};
 

