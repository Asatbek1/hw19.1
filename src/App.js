import { useEffect, useState } from "react";
import "./App.css";
import Items from "./Items";

function App() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);

  function addTodo(event) {
    setValue(event.target.value);
  }

  const addTodoPost = async () => {
    await fetch("https://add-todo-1eae2-default-rtdb.firebaseio.com/todos.json", {
      method: "POST",
      body: JSON.stringify({ text: value }),
      headers: { "Content-Type": "application/json" },
    });
    addTodoGed();
  };

  async function addTodoGed() {
    const response = await fetch(
      "https://add-todo-1eae2-default-rtdb.firebaseio.com/todos.json"
    );
    const data = await response.json();
    console.log(data);
    const apdaitedData = [];
    for (const key in data) {
      apdaitedData.push({
        id: key,
        text: data[key].text,
      });
    }
    setTodo(apdaitedData);
  }

  useEffect(() => {
    addTodoGed();
  }, []);

  async function deleteId(id) {
    await fetch(
      `https://add-todo-1eae2-default-rtdb.firebaseio.com/todos/${id}.json`,
      {
        method: "DELETE",
      }
    );
    addTodoGed();
  }

  function submitHandler(event) {
    event.preventDefault();
    setTodo((prev) => [...prev, { text: value }]);

    addTodoPost();

    setValue("");
    console.log(todo);
  }
  const putHandler = async (putId, tast, addChandge) => {
    console.log(putId, "put id");
    deleteId(putId);
    const response = await fetch(
      `https://add-todo-1eae2-default-rtdb.firebaseio.com/todos/${putId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ text: tast }),
      }
    );
    console.log(response);
    // addTodoGed()
    addChandge();
  };

  return (
    <>
      <form className="App" onSubmit={submitHandler}>
        <input value={value} type="text" onChange={addTodo} />
        <button>Добавить</button>
      </form>
      <div>
        <ul>
          {todo.map((el, index) => (
            <li key={index}>
              <Items
                id={el.id}
                text={el.text}
                deleteId={deleteId}
                getData={addTodoGed}
                editData={putHandler}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
