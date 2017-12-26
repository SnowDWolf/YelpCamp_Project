var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [{
        name: "Sol Valley",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Ijpc7PZE8A__13qVnwOqBxtYJG4PskoHDukJUlUUiHzCPbxZ",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget eros nunc. Vivamus sed lacus eget sem rhoncus accumsan in et nibh. Vivamus maximus pretium risus, vitae fringilla velit fringilla sagittis. Cras condimentum nulla a consectetur mattis. Aenean pellentesque lorem id urna lobortis, non sodales risus euismod. Donec pellentesque lectus et risus volutpat ornare. Suspendisse quis turpis sed sapien facilisis placerat tincidunt et justo. Morbi sollicitudin nisl eget lectus porttitor, sed congue massa efficitur."
    },
    {
        name: "Rocky Hill",
        image: "https://www.nps.gov/seki/planyourvisit/images/LPsite208_400.jpg?maxwidth=650&autorotate=false",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget eros nunc. Vivamus sed lacus eget sem rhoncus accumsan in et nibh. Vivamus maximus pretium risus, vitae fringilla velit fringilla sagittis. Cras condimentum nulla a consectetur mattis. Aenean pellentesque lorem id urna lobortis, non sodales risus euismod. Donec pellentesque lectus et risus volutpat ornare. Suspendisse quis turpis sed sapien facilisis placerat tincidunt et justo. Morbi sollicitudin nisl eget lectus porttitor, sed congue massa efficitur."
    },
    {
        name: "Spring Hill",
        image: "http://image.mlive.com/home/mlive-media/width620/img/sports_impact/photo/dsc-0561jpg-7c26a3bb7eb17048.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget eros nunc. Vivamus sed lacus eget sem rhoncus accumsan in et nibh. Vivamus maximus pretium risus, vitae fringilla velit fringilla sagittis. Cras condimentum nulla a consectetur mattis. Aenean pellentesque lorem id urna lobortis, non sodales risus euismod. Donec pellentesque lectus et risus volutpat ornare. Suspendisse quis turpis sed sapien facilisis placerat tincidunt et justo. Morbi sollicitudin nisl eget lectus porttitor, sed congue massa efficitur."
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