import React, { useState } from "react";

function NoteInput(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  function updateNote(event) {
    const { value, name } = event.target;
    setNote(prevNote => {
      return { ...prevNote, [name]: value };
    });
  }

  return (
    <div className="note-input">
      <input
        placeholder="Title"
        name="title"
        value={note.title}
        onChange={updateNote}
      ></input>
      <textarea
        placeholder="Write your note here"
        name="content"
        value={note.content}
        onChange={updateNote}
        cols="30"
        rows="3"
      ></textarea>
      <button
        onClick={() => {
          props.addNote(note);
          setNote({ title: "", content: "" });
        }}
      >
        Add
      </button>
    </div>
  );
}

export default NoteInput;
