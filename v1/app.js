var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
    { name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg" },
    { name: "Peak Valley", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg" },
    { name: "Sol Park", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg" },
    { name: "Salmon Creek", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg" },
    { name: "Peak Valley", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg" },
    { name: "Sol Park", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg" }
]

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
    // get data from and add to campgrounds array
    //redirect back to campgrounds page
    var image = req.body.image;
    var name = req.body.name;
    var newCampground = { name: name, image: image };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(5000, function() {
    console.log("YelpCamp started");
});