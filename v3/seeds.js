var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [{
        name: "Sol Valley",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Ijpc7PZE8A__13qVnwOqBxtYJG4PskoHDukJUlUUiHzCPbxZ",
        description: "blah blah blah"
    },
    {
        name: "Rocky Hill",
        image: "https://www.nps.gov/seki/planyourvisit/images/LPsite208_400.jpg?maxwidth=650&autorotate=false",
        description: "blah blah blah"
    },
    {
        name: "Spring Hill",
        image: "http://image.mlive.com/home/mlive-media/width620/img/sports_impact/photo/dsc-0561jpg-7c26a3bb7eb17048.jpg",
        description: "blah blah blah"
    }
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log("err");
        } else {
            console.log("removed campgrounds");
            //add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("added campground");
                        //create a comment
                        Comment.create({
                            text: "This place is great, but I wish there was internet",
                            author: "Greg"
                        }, function(err, comment) {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new Comment")
                        });
                    }
                });
            });
        }
    });
    //add a few comments
}
module.exports = seedDB;