const express = require('express');
const path = require('path')
const fs = require("fs");
const app = express();
const generateUniqueId = require('generate-unique-id');
const PORT = 3001;
let note = require('./db/db.json');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//loads the notes into the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//loads the json notes api
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'))
});

//loads the home page using wildcard
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

//deletes a note by it's id, and then saves the notes with the deleted note removed
app.delete('/api/notes/:id', (req, res) => {
  note = note.filter((selectedNote) => selectedNote.id !== req.params.id);
  saveNoteJSON(note);
  res.json('note deleted');
});

//adds a note and assigns a unique id to every new note
app.post('/api/notes', (req, res) => {
  
  const newNote = req.body;
  newNote.id = generateUniqueId({
    length: 4,
    useLetters: false
  });
  console.log(newNote);
  note.push(newNote);
  res.json(newNote);
  saveNoteJSON(note);
})

// saves the json note
function saveNoteJSON(note) {
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(note, null, 2)
  );
  return note;
}


app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});


