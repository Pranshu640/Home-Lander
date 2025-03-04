const User = require('../models/user.js');
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const path = require('path');

module.exports.rendercreate =  (req,res) => {
    res.render('Users/signup.ejs');
};

module.exports.create = async(req,res) => {
    try{
        let {username , email , password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser , password)
    console.log(registeredUser)
    req.login(registeredUser,(err) => {
        if (err){
            return next(err);
        }
        req.flash("success" , "Welcome to Homelander");
        res.redirect("/listings");
    })
    }catch(e){
        req.flash("error" , e.message);
        res.redirect('/signup');
    }
};

module.exports.renderlogin = (req, res) => {
    console.log("Views path:", path.join(__dirname, '../views'));
    console.log("Current directory:", __dirname);
    res.render('Users/login.ejs');
};

module.exports.login = async (req ,res) => {
    req.flash("success" , "welcome back to Homelander");
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.logout =  (req , res , next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success" , "you are now logged out");
        res.redirect("/listings");
    })
};