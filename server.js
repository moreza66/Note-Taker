// require dependencies;
const express = require("express");
const path = require("path");
const fs = require("fs");
let notes = require("./db/db.json")


//set the app
const app = express();

// create PORT
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Get the notes from db json
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res) {
res.sendFile(path.join(__dirname, "public/index.html"));
});



// Get the notes from db json
app.get("/api/notes", function (req, res) {

    return res.json(notes);
});

// making an id from length of notes array.
let noteId = notes.length;

//add the notes to db json
app.post("/api/notes", function (req, res) {
    const newNote = req.body;

    newNote["id"] = noteId +1;
    noteId++;
    console.log(newNote);

    notes.push(newNote);
    console.log(">>>>", notes)

    writeFileSync();

    return res.status(200).end();
});

app.delete("/api/notes/:id", function (req, res) {
    res.send('Got a DELETE request at /api/notes/:id')
    // getting the id from request inorder to delete the note
    const id = req.params.id;

    const minId = notes.filter (x => x.id < id);


    const maxId = notes.filter( x => x.id > id);

    notes = minId.concat(maxId);

    writeFileSync();
})

const writeFileSync = () => {
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
  console.log("YAY! server is listening now on port ... " + PORT);
});