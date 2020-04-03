// Build basic server first, get it to listen on 3000. Use previous work as template
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const dbJson = require("./db/db.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'db')));
const PORT = process.env.PORT || 3000;

let noteData = [];

// Set Routes

// HTML
//* The following HTML routes should be created:
//  * GET `/notes` - Should return the `notes.html` file.

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });
//  * GET `*` - Should return the `index.html` file
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

// API
// * The following API routes should be created:
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {

  res.json(dbJson);
});

// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {  
  try {
    noteData = fs.readFileSync("db/db.json", "utf8");
    noteData = JSON.parse(noteData);
    console.log(noteData);

    req.body.id = noteData.length;
    noteData.push(req.body);
    noteData = JSON.stringify(noteData);

    fs.writeFile("db/db.json", noteData, "utf8", function(err) {
      if (err) throw err;
    });
    res.json(JSON.parse(noteData));
  }
  catch (err) {
    console.log("Something's not working in API post:");
    console.log(err);
  }
});
// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", function(req,res){
  try {
    noteData = fs.readFile("db/db.json", "utf8");
    console.log(noteData);
    noteData = JSON.parse(noteData);
    noteData = noteData.filter(function(note) {
      return note.id != req.params.id;
    });

    noteData = JSON.stringify(noteData);

    fs.writeFile("db/db.json", noteData, "utf8", function(err) {
      if (err) throw err;
    });
    res.json(JSON.parse(noteData));
  }
  catch (err) {
    console.log("Something's not working in API delete:");
    console.log(err);
  }
});

// Listens
app.listen(PORT, () =>{
    console.log(`Server is listening on ${PORT}`)
});