//Build basic server first, get it to listen on 3000. Use previous work as template, some vars may need removing
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//HTML Routes


//Listens
app.listen(PORT, () =>{
    console.log(`Server is listening on ${PORT}`)
});