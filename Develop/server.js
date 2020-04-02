//Build basic server first, get it to listen on 3000. Use previous work as template, some vars may need removing
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Set Routes

//HTML
//* The following HTML routes should be created:
//  * GET `/notes` - Should return the `notes.html` file.
//  * GET `*` - Should return the `index.html` file
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

  // If no matching route is found default to index
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

//API

//Listens
app.listen(PORT, () =>{
    console.log(`Server is listening on ${PORT}`)
});