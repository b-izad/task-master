import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import { loadState, saveState } from './Storage';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [toDos, setToDos] = useState(() => loadState() || []);

  useEffect(() => {
    saveState(toDos);
  }, [toDos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    setToDos([...toDos, { title: inputValue, completed: false }]);
    setInputValue("");
  };

  const handleEdit = (index, newTitle) => {
    const newToDos = [...toDos];
    newToDos[index].title = newTitle;
    setToDos(newToDos);
  };

  const handleDelete = (index) => {
    const newToDos = [...toDos];
    newToDos.splice(index, 1);
    setToDos(newToDos);
  };

  const handleToggleComplete = (index) => {
    const newToDos = [...toDos];
    newToDos[index].completed = !newToDos[index].completed;
    setToDos(newToDos);
  };

  return (
    <div className="App">
      <h1> Welcome to TaskMaster!</h1>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Add new to-do item"
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {toDos.map((toDo, index) => (
            <li key={index}>
              <input
                className={toDo.completed ? "completed" : ""}
                type="text"
                value={toDo.title}
                onChange={(event) => handleEdit(index, event.target.value)}
              />
              <div>
                <button onClick={() => handleToggleComplete(index)}>
                  {toDo.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default App;
