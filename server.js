//======================================================================
// Welcome to my Note-Taker, based on Express.js.

// Below are my dependencies;
//======================================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
let notes = require("./db/db.json")

//======================================================================
// This sets up the Express App
//======================================================================

const app = express();
const PORT = process.env.PORT || 3001;

//==============================================================================
// This sets up data parsing-- Express will interpret it/format data as JSON.
// This is required for API calls!
//==============================================================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

currentID = notes.length;

//==============================================================================
// On page load, it should start with index.html. First get it and then listen.
//==============================================================================
// Since the GET and POST functions grab from the same route, we can set it once up here.

app.get("/api/notes", function (req, res) {

    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    newNote["id"] = currentID +1;
    currentID++;
    console.log(newNote);

    notes.push(newNote);

    writeFileSync();

    return res.status(200).end();
});

app.delete("/api/notes/:id", function (req, res) {
    res.send('Got a DELETE request at /api/notes/:id')
// This allows the test note to be the original note.
    const id = req.params.id;

    let lowestId = notes.filter(function (less) {
        return less.id < id;
    });

    let highestId = notes.filter(function (greater) {
        return greater.id > id;
    });

    notes = lowestId.concat(highestId);

    writeFileSync();
})

//==============================================================================
// Gotta link to my assets!

app.use(express.static("public"));


//==============================================================================
// Gotta link to my assets!

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});





function writeFileSync() {
    fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
        if (err) {
            console.log("error")
            return console.log(err);
        }

        console.log("Success!");
    });
}

//make the app listen to the server

app.listen(PORT, function () {
  console.log("API server now listening to port" + PORT);
});