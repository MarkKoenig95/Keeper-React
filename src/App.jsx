import React, { useState, useEffect } from "react";
import Header from "./Models/Header";
import Footer from "./Models/Footer";
import Note from "./Models/Note";
import NoteInput from "./Models/NoteInput";
import axios from "axios";
var key = 2;

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/notes")
      .then(res => {
        setNotes(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  });

  function addNote(note) {
    key++;
    //Set notes to be an array of objects including the previous notes as well as the new note
    axios
      .post("/api/notes", {
        key: key,
        title: note.title,
        content: note.content
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function deleteNote(id) {
    axios.delete("/api/note/" + id).catch(error => {
      console.log(error);
    });
  }

  return (
    <div>
      <Header />
      <NoteInput addNote={addNote} />
      {notes.map(note => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
