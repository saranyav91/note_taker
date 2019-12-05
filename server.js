// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var characters = [
    {
        routeName: "yoda",
        name: "Yoda",
        role: "Jedi Master",
        age: 900,
        forcePoints: 2000
    },
    {
        routeName: "darthmaul",
        name: "Darth Maul",
        role: "Sith Lord",
        age: 200,
        forcePoints: 1200
    },
    {
        routeName: "obiwankenobi",
        name: "Obi Wan Kenobi",
        role: "Jedi Master",
        age: 55,
        forcePoints: 1350
    }
];

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.delete('/api/notes/:id', function (req, res) {
    var id = req.params.id;
    //read frm file
     console.log('in delete');
    let rawdata = fs.readFileSync('./db/db.json');
    let note = JSON.parse(rawdata);
    for (var i = 0; i < note.length; i++) {
        if (id === note[i].id) {
            note.splice(i, 1);
        }
    }
    console.log(note);
    fs.writeFile("./db/db.json", JSON.stringify(note), function (err, result){
        if(err) console.log('error', err);
    });
    //write elist back to db.json file
    res.send('Got a DELETE request')
});

// Displays all notes
app.get("/api/notes", function (req, res) {
    //read from db.json file

    console.log('hi' + req.body);
    let rawdata = fs.readFileSync('./db/db.json');
    let note = JSON.parse(rawdata);

    console.log('after calling readFile' + note);
    return res.json(note);
});


// Create New notes - takes in JSON input
app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newnote = req.body;
     
    
var json;
fs.readFile('./db/db.json', function (err, data) {
     json = JSON.parse(data);
    json.push(newnote);

    fs.writeFile("./db/db.json", JSON.stringify(json), function (err, result){
        if(err) console.log('error', err);
    });
});
    // We then add the json the user sent to the db.json - write to file
    
    // We then display the JSON to the users
    let rawdata = fs.readFileSync('./db/db.json');
    let note = JSON.parse(rawdata);

    console.log('after calling readFile' + note);
    return res.json(note);
     
});



app.get("*", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
