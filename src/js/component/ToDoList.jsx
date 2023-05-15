import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState([]); // estado para almacenar la lista de tareas
  const [inputValue, setInputValue] = useState(""); // estado para almacenar el valor del input

  // función para realizar solicitudes a la API
  const fetchData = async (method, data) => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/username",
      {
        method: method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    return result;
  };

  // efecto para obtener la lista de tareas de la API cuando el componente se monta por primera vez
  useEffect(() => {
    fetchData("GET").then((data) => setTodo(data));
  }, []);

  // función para agregar una nueva tarea a la lista
  const addTodo = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newTodo = [...todo, { label: inputValue, done: false }];
      setTodo(newTodo);
      setInputValue("");
      fetchData("PUT", newTodo); // actualiza la lista en la API
    }
  };

  // función para eliminar una tarea de la lista
  const deleteTodo = (index) => {
    const newTodo = todo.filter((_, i) => i !== index);
    setTodo(newTodo);
    fetchData("PUT", newTodo); // actualiza la lista en la API
  };

  // función para limpiar toda la lista
  const clearList = () => {
    setTodo([]);
    fetchData("PUT", []); // actualiza la lista en la API
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyPress={addTodo}
        placeholder="Añadir tarea"
      />
      <ul>
        {todo.length === 0 ? (
          <li>No hay tareas, añadir tareas</li>
        ) : (
          todo.map((todo, index) => (
            <li key={index}>
              {todo.label}
              <span className="delete-btn" onClick={() => deleteTodo(index)}>
                x
              </span>
            </li>
          ))
        )}
      </ul>
      <button onClick={clearList}>Limpiar lista completa</button>
    </div>
  );
};

export default TodoList;
