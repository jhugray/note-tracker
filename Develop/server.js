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


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.delete('/api/notes/:id', (req, res) => {
  note = note.filter((selectedNote) => selectedNote.id !== req.params.id);
  createNewNote(note);
  res.json('note deleted');
});

app.post('/api/notes', (req, res) => {
  // res.send(req.body)
  // console.log(req.body)
  // notes.push(req.body)

  const newNote = req.body;
  newNote.id = generateUniqueId({
    length: 4,
    useLetters: false
  });
  console.log(newNote);
  note.push(newNote);
  res.json(newNote);
  createNewNote(note);
})


function createNewNote(note) {
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(note, null, 2)
  );
  return note;
}

// function createNewAnimal(body, animalsArray) {
//   const animal = body;
//   animalsArray.push(animal);
//   fs.writeFileSync(
//     path.join(__dirname, '../data/animals.json'),
//     JSON.stringify({animals: animalsArray}, null, 2)
//   );
//   return animal;
// }





// app.get('/notes/:note', (req, res) => {
//   const chosen = req.params.note;


//   console.log(chosen);

//   for (let i = 0; i < notes.length; i++) {
//     if (chosen === notes[i].routeName) {
//       return res.json(notes[i]);
//     }
//   }

//   return res.json(false);
// });

// app.post('/notes', (req, res) => {
//   const newNote = req.body;

//   console.log(newNote);

//   notes.push(newNote);

//   res.json(newNote);
// });


app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});

