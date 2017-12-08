var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Peak Valley",
//     image: "https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
//     description: "This is the coldest mountain on earth, but has the best scenery"
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND: ")
//         console.log(campground);
//     }
// });

app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX ROUTE - Show all campgrounds (1)
app.get("/campgrounds", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allcampgrounds });
        }
    });
});

// CREATE ROUTE - add new campgrounds to database (3)
app.post("/campgrounds", function(req, res) {
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
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", { campground: foundCampground });
        }
    });
});



app.listen(5000, function() {
    console.log("YelpCamp started");
});