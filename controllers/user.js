const User = require("../models/user");

// SIGNUP FORM
module.exports.renderSignup = (req, res) => {
  res.render("users/signup");
};

// SIGNUP
module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to Wonderlust!");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// LOGIN FORM
module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

// LOGIN
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back Sir!");
  let redirectUrl = res.locals.redirectUrl || "/";
  res.redirect(redirectUrl);
};

// LOGOUT
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "You are logged out");
    res.redirect("/");
  });
};
