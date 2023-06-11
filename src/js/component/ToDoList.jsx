import React, { useState, useEffect } from "react";

function MyTodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      let newTask = { title: inputValue, completed: false };
      setTasks([...tasks, newTask]);
    }
    setInputValue("");
  };

  const updateTasks = () => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/snishino', {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClearAllTasks = () => {
    const updatedTasks = [];
    setTasks(updatedTasks);
  };

  useEffect(() => {
    updateTasks();
  }, [tasks]);
  

  return (
    <div className="container py-4">
      <div className="text-center" >
        <form onSubmit={addTask}>
          <div className="input-group mb-3">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              type="text"
              className="form-control"
              placeholder="Agregar nueva tarea"
              style={{ borderRadius: "10px 0 0 10px" }}
            />
            <button className="btn btn-primary" type="submit">
              Agregar
            </button>
          </div>
        </form>
        <ul className="list-group">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {task.title}
              <button className="btn btn-danger" onClick={() => setTasks(tasks.filter((_, i) => index !== i))}>
                x
              </button>
            </li>
          ))}
        </ul>
        <p style={{ color: "#3f5efb", fontSize: "2.5rem" }}>{tasks.length === 0 ? "No hay tareas pendientes" : `Tienes ${tasks.length} tareas pendientes`}</p>
        <button className="btn btn-danger mt-3" onClick={handleClearAllTasks}>
          Borrar todas las tareas
        </button>
      </div>
    </div>
  );
}

export default MyTodoList;
