if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const fs = require('fs');

const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

const flash = require("connect-flash");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsmate);
app.use(express.static(path.join(__dirname , "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const viewsPath = path.join(__dirname, "views");
console.log("Views directory exists:", fs.existsSync(viewsPath));
console.log("Users directory exists:", fs.existsSync(path.join(viewsPath, "users")));

const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60
});
 
store.on("error" , (err) => {
    console.log("Error in mongo session store" , err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req , res , next) => {
    res.locals.success = req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.curuser = req.user;
    next();
})

// const MONGO_URL = "mongodb://127.0.0.1:27017/Homelander"


async function main() {
    try {
        await mongoose.connect(dbUrl, {
            tls: true,
            tlsAllowInvalidCertificates: false,
        });
        console.log("Connected to DB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

main();

// Root route moved after middleware
app.get('/' , (req , res) => {
    res.render('listings/Hero.ejs');
});

app.use("/listings" , listingRouter);
app.use("/listings/:id/reviews" , reviewRouter);
app.use("/" , userRouter)

app.all("*" , (req , res , next) => {
    next(new ExpressError(404 , "Page Not Found!"));
});

app.use((err, req, res, next) => {
    console.error(err);
    let { statusCode = 500, message = "Something went wrong!" } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    res.status(statusCode).render("error.ejs", { err });
});

const port = process.env.PORT || 3000;

// Start server (for Render and local development)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export for Vercel
module.exports = app;
