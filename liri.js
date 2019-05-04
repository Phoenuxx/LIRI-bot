var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var axios = require("axios");
var fs = require("fs");

var command = process.argv[2];



if (command === "movie-this") {
    getMoveie();
} else if (command === "spotify-this-song") {
    var spotify = new Spotify({
        id: f9b2fa8ba55c4d15a44d89c68aa7c3e0,
        secret: cca9d8fee41045dcb64275b037880a0b,
      });
    getSong();
} else if (command === "do-what-it-says") {
    doThis();
} else if (COMMAND === "concert-this") {
    getConcert();
} else {
    console.log("I have no clue what you just said...");
}

// TRILOGY
// codingbootcamp


function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        console.log(data);
    })
}

function getMoveie() {
    var searchItem = "Cinderella";

    axios.get("http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("The movie's rating is: " + response.data.imdbRating);
        })
}





function getSong() {
//     var f9b2fa8ba55c4d15a44d89c68aa7c3e0 = f9b2fa8ba55c4d15a44d89c68aa7c3e0;
// var cca9d8fee41045dcb64275b037880a0b = cca9d8fee41045dcb64275b037880a0b;


    var searchItem = "Something Like This"
    spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
}

// function getConcert() {

// }