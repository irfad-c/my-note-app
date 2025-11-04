import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const Note = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  //track if it's first render
  const isFirstLoad = useRef(true);

  //Load notes from localStorage on first render
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    console.log("Loaded from localStorage - first useEffect:", savedNotes);
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage only after first load
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      //Fist time if condition will be true.So return function will run and localsStorage.setItem will not work.
      // During the first time rendering itself  isFirstLoad.current become false (That is the work of this function).When we add or delete any note then if condition will be false at the time.So LocalStorage.setItem will run.
      return;
    }
    console.log("Saving to localStorage- Second useEffect:", notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAdd = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    //We are adding new note to existing notes.Later we are clearing the input box using setNote('')
    setNote("");
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    //_ is the unused text index
    setNotes(updatedNotes);
  };

  return (
    <div className="container">
      <h2 className="heading">📝 React Notes App</h2>
      <input
        className="input-container"
        type="text"
        value={note}
        placeholder="Write a note..."
        //e is the event object.e.target is the actual input element.
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={handleAdd} className="btn">
        Add
      </button>

      <ul className="ul-style">
        {notes.length === 0 && <p>No notes yet</p>}
        {notes.map((n, i) => (
          <li key={i} className="li-style">
            {n}
            <button className="btn-delete" onClick={() => handleDelete(i)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
