import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // This runs only on the first render because of the empty [] dependency array.
  useEffect(() => {
    console.log("Loading tasks:", localStorage.getItem("tasks"));
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks); // ✅ this triggers localStorage update properly
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>React To-Do List</h2>
      {/*e.target refers to the HTML element that triggered the event.Here it means the text typed by the user in the input field*/}
      <input
        type="text"
        value={task}
        placeholder="Add a task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      {/*task list*/}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t, i) => (
          <li key={i} style={{ margin: "10px 0" }}>
            {t}
            {/*This is space*/}{" "}
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

export default TodoApp;