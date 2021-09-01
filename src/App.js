import { Header, Todo, Filters, Attribution } from "./index";
import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [allTodos, setAllTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [todos, setTodos] = useState([]);
  const [countTodos, setCountTodos] = useState(0);

  // Submit Todo
  const handleSubmit = (e) => {
    if (!inputValue) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const newItem = {
        id: new Date().getTime().toString(),
        value: inputValue,
        status: false,
      };
      setAllTodos([...allTodos, newItem]);
      setInputValue("");
    }
  };

  // Add TO LS
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodos));
    setTodos(allTodos);

    // Items left
    const handleItemsLeft = () => {
      let filteredTodos = allTodos.filter((todo) => todo.status === false);
      setCountTodos(filteredTodos.length);
    };
    handleItemsLeft();
  }, [allTodos]);

  // Remove Todo
  const handleRemoveTodo = (e) => {
    let element = e.target.parentElement.parentElement;
    let id = element.id;
    element.classList.add("removeAnimation");
    element.addEventListener("animationend", () => {
      let filteredTodos = allTodos.filter((todo) => todo.id !== id);
      setAllTodos(filteredTodos);
    });
  };

  // Clear Todos
  const handleRemoveAllTodos = () => {
    let filteredTodos = allTodos.filter((todo) => todo.status === false);
    setAllTodos(filteredTodos);

    let getFilters = document.querySelectorAll(".filters span");
    getFilters.forEach((filter) => {
      filter.classList.remove("active");
    });
    getFilters[0].classList.add("active");
  };

  // Complet Todo
  const handleCompletedTodo = (currentID, currentStatus) => {
    let id = currentID;
    let status = currentStatus;

    const findIndex = allTodos.findIndex((todo) => todo.id === id);
    const updateTodo = { ...allTodos[findIndex], status };

    const updateAllTodos = [
      ...allTodos.slice(0, findIndex),
      updateTodo,
      ...allTodos.slice(findIndex + 1),
    ];

    setAllTodos(updateAllTodos);
  };

  // FILTER TODOS
  const filterCompletedTodos = () => {
    let filteredTodos = allTodos.filter((todo) => todo.status === true);
    setTodos(filteredTodos);
  };

  const filterActiveTodos = () => {
    let filteredTodos = allTodos.filter((todo) => todo.status === false);
    setTodos(filteredTodos);
  };

  const filterAllTodos = () => {
    setTodos(allTodos);
  };

  const handleActiveClass = (e) => {
    let getFilters = document.querySelectorAll(".filters span");
    getFilters.forEach((filter) => {
      filter.classList.remove("active");
    });
    let currentFilter = e.target;
    currentFilter.classList.add("active");
  };

  return (
    <>
      <Header />
      <section className="addTodo">
        <form onKeyPress={handleSubmit}>
          <FaCircle />
          <input
            type="text"
            placeholder="Create a new todo..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </form>
      </section>
      <section className="todo_section">
        <div className="row">
          {todos.map((item) => {
            return (
              <Todo
                item={item}
                key={item.id}
                handleRemoveTodo={handleRemoveTodo}
                handleCompletedTodo={handleCompletedTodo}
              />
            );
          })}
          <div
            className={`todo_section__info ${allTodos.length ? "" : "hide"}`}
          >
            <p>
              {countTodos === 1
                ? `${countTodos} item left`
                : `${countTodos} items left`}
            </p>
            <span className="filtersDesktop">
              <Filters
                filterAllTodos={filterAllTodos}
                filterActiveTodos={filterActiveTodos}
                filterCompletedTodos={filterCompletedTodos}
                handleActiveClass={handleActiveClass}
              />
            </span>
            <span onClick={handleRemoveAllTodos} className="clearSpan">
              Clear Completed
            </span>
          </div>
        </div>
      </section>
      <section className={`filtersMobile ${allTodos.length ? "" : "hide"}`}>
        <div className="row_filters">
          <Filters
            filterAllTodos={filterAllTodos}
            filterActiveTodos={filterActiveTodos}
            filterCompletedTodos={filterCompletedTodos}
            handleActiveClass={handleActiveClass}
          />
        </div>
      </section>
      <Attribution />
    </>
  );
}

export default App;
