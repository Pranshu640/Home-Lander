const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const UserController = require("../controllers/users.js");

router.route('/signup')
.get(UserController.rendercreate)
.post(wrapAsync(UserController.create));

router.route("/login")
.get(UserController.renderlogin)
.post(saveRedirectUrl,passport.authenticate("local" , {
    failureRedirect : '/login' , failureFlash : true}),
    wrapAsync(UserController.login));

router.get("/logout" ,UserController.logout);

module.exports = router;