var dotenv = require("dotenv").config();
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var command = process.argv[2];
var searchItem = "";
var searchUri = "";
var nodeArgs = process.argv;

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
     searchItem = searchItem + "+" + nodeArgs[i];
    }
    else {
      searchItem += nodeArgs[i];
  
    }
  }
if (command === "movie-this") {
    getMoveie(searchItem);
} else if (command === "spotify-this-song") {
    getSong(searchItem);
} else if (command === "do-what-it-says") {
    doThis(searchItem);
} else if (command === "concert-this") {
    getConcert(searchItem);
    console.log("search " + searchItem);
} else {
    console.log("I have no clue what you just said...");
}





function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        console.log(data);
    });
    logCommand("did the thing");
}

function getMoveie(movie) {

    nodeArgs = process.argv;

      if (searchItem === "") {
        searchItem = "Mr. Nobody";
    } 
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
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
    logCommand("movie this", movie);
}

function getSong(song) {

    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].preview_url); 
        console.log(data.tracks.items[0].name); 
         searchUri = data.tracks.items[0].uri;
    });
    logCommand("Spotify This Song", song);
}

function getConcert(artist) {
// artist = "pegboard nerds"
var getURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
console.log(getURL);
    axios
    .get(getURL)
    .then(function(events) {
            var inTown = events.data[0];
            var date = inTown.datetime;
            var momentDate = moment(inTown.datetime);
        // return array of events
        console.log("Their Next Venue is: " + inTown.venue.name);
        console.log ("In: " + inTown.venue.city + " " + inTown.venue.region)
        console.log("At: " + momentDate.format("MM/DD/YYYY hh:mm"));
      })
      logCommand("concer-this", artist);
    }
    
function logCommand(action, query) {
    var lineBreak = "\n ";
    var loggableAction = lineBreak + action + " " + query;
    fs.appendFile("log.txt", loggableAction, function(err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
    // Otherwise, it will print: "movies.txt was updated!"
    // console.log(loggableAction);
  
  });
}