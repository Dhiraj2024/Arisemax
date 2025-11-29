const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { isAdmin } = require("../middleware");

router.get("/admin/dashboard", isAdmin, async (req, res) => {
  const users = await User.find({});
  res.render("admin/dashboard", { users });
});


module.exports = router;
