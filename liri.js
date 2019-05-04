var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");

var command = process.argv[2];
var searchItem = "";
var nodeArgs = process.argv;


if (command === "movie-this") {
    getMoveie();
} else if (command === "spotify-this-song") {
    
    getSong();
} else if (command === "do-what-it-says") {
    doThis();
} else if (command === "concert-this") {
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
    searchItem = "";
    nodeArgs = process.argv;
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
         searchItem = searchItem + "+" + nodeArgs[i];
        }
        else {
          searchItem += nodeArgs[i];
      
        }
      }
      if (searchItem === "") {
        searchItem = "Mr. Nobody";
    } 
    axios.get("http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            if (response.data.Response === "True") {
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("imbd Rating: " + response.data.imdbRating);
            console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value);
            console.log("Country of Origin: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Synopsis: " + response.data.Plot);
            console.log("Starring Actors: " + response.data.Actors);
            } else if (response.data.Response === "False"){
                console.log("You sure you typed that right?");
            }
        })
        logCommand("movie this", searchItem);
}





function getSong() {


    var searchItem = "I Want it That Way"
    spotify.search({ type: 'track', query: searchItem, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks[17]); 
      });
}

// function getConcert() {

    // }
    
function logCommand(action, y) {
    var lineBreak = "\n ";
    var loggableAction = lineBreak + action + " " + y;
    fs.appendFile("log.txt", loggableAction, function(err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
    // Otherwise, it will print: "movies.txt was updated!"
    console.log(loggableAction);
  
  });
}