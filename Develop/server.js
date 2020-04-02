// Build basic server first, get it to listen on 3000. Use previous work as template
const express = require('express');
const path = require('path');
const dbJson = require(__dirname, "./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Set Routes

// HTML
//* The following HTML routes should be created:
//  * GET `/notes` - Should return the `notes.html` file.

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

//  * GET `*` - Should return the `index.html` file
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

// API
// * The following API routes should be created:
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
  res.json(dbJson);
});
// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function(req, res) {     
  dbJson.push(req.body);
});
// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


// Listens
app.listen(PORT, () =>{
    console.log(`Server is listening on ${PORT}`)
});