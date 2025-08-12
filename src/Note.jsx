import React, { useState, useEffect, useRef } from "react";

const Note = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const isFirstLoad = useRef(true); // 👈 track if it's first render

  // Load notes from localStorage on first render
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    console.log("Loaded from localStorage - first useEffect:", savedNotes);
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage only after first load
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false; //Fist time if condition will be true.So return function will run and localsStorage.setItem will not work.During the first time itself  isFirstLoad.current become false (That is the work of this function).When we add or delete any note then if condition will be false at the time.So LocalStorage.setItem will run.
      return;
    }
    console.log("Saving to localStorage- Second useEffect:", notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAdd = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
    //We are adding new note to existing notes.Later we are clearing the input box using setNote('')
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    //_ is the unused text index
    setNotes(updatedNotes);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>📝 React Notes App (localStorage)</h2>
      <input
        type="text"
        value={note}
        placeholder="Write a note..."
        onChange={(e) => setNote(e.target.value)}
        //e is the event object.e.target is the actual input element.
      />
      <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
        Add
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {notes.length === 0 && <p>No notes yet</p>}
        {notes.map((n, i) => (
          <li key={i} style={{ marginBottom: "10px" }}>
            {n}
            <button
              onClick={() => handleDelete(i)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
