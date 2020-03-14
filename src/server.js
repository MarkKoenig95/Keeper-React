const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/notesDB", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = new mongoose.model("Note", noteSchema);

app.set(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

////////////////////////////////////// API Requests //////////////////////////////////////////////////////////

app.get("/api/notes", (req, res) => {
  Note.find((err, notes) => {
    if (!err) {
      res.send(notes);
    } else {
      console.log(err);
    }
  });
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);

  let note = new Note({
    title: req.body.title,
    content: req.body.content
  });

  note.save();
});

app.delete("/api/note/:noteId", (req, res) => {
  Note.deleteOne({ _id: req.params.noteId }, err => {
    if (err) {
      res.send(err);
    }
  });
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
