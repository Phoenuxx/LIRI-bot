var dotenv = require("dotenv").config();
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var command = process.argv[2];
var searchItem = "";
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
    getMovie(searchItem);
} else if (command === "spotify-this-song") {
    getSong(searchItem);
} else if (command === "do-what-it-says") {
    doThis();
} else if (command === "concert-this") {
    getConcert(searchItem);
} else {
    console.log("I have no clue what you just said...");
}





function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        split = data.split(",");
        command = split[0];
        searchItem = split[1];
        getMovie(searchItem);
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
    });
}

function getMovie(movie) {

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
            } else if (response.data.Response === "False") {
                console.log("You sure you typed that right?");
            }
        })
}

function getSong(song) {
    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].name);
    });
}

function getConcert(artist) {
    var getURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios
        .get(getURL)
        .then(function (events) {
            var inTown = events.data[0];
            var momentDate = moment(inTown.datetime);
            // return array of events
            console.log("Venue Name: " + inTown.venue.name);
            console.log("City: " + inTown.venue.city + " " + inTown.venue.region)
            console.log("Date: " + momentDate.format("MM/DD/YYYY hh:mm"));
        })
}

function logCommand(action, query) {
    var lineBreak = "\n ";
    var loggableAction = lineBreak + action + " " + query;
    fs.appendFile("log.txt", loggableAction, function (err) {
        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }
    });
}

logCommand(command, searchItem);