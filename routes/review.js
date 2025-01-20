const express = require("express");
const router = express.Router( {mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,validateReview,isReviewAuthor} = require('../middleware.js');

const ReviewController = require("../controllers/review.js");

router.post("/" ,isLoggedIn,validateReview, wrapAsync(ReviewController.create));

router.delete("/:reviewId" ,isLoggedIn,isReviewAuthor, wrapAsync(ReviewController.delete));

module.exports = router;