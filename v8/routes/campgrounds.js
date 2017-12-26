var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// INDEX ROUTE - Show all campgrounds (1)
router.get("/", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allcampgrounds });
        }
    });
});

// CREATE ROUTE - add new campgrounds to database (3)
router.post("/", isLoggedIn, function(req, res) {
    // get data from and add to campgrounds array
    var image = req.body.image;
    var name = req.body.name;
    var desc = req.body.description;
    var newCampground = { name: name, image: image, description: desc };

    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })


});

// NEW ROUTE - show form to create new camground (2)
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;