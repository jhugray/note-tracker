const path = require('path')
const express = require('express');
const app = express();
const PORT = 3001;
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});
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
