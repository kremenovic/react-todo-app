import React from "react";

import { FaCircle } from "react-icons/fa";

function Todo({ item, handleRemoveTodo, handleCompletedTodo }) {
  const handleCheck = (e) => {
    let currentID = e.target.parentElement.parentElement.parentElement.id;
    if (!item.status) {
      handleCompletedTodo(currentID, true);
    } else {
      handleCompletedTodo(currentID, false);
    }
  };

  return (
    <div className="todo_section__item addAnimation" id={item.id}>
      <div className="todo_text">
        <span>
          <img
            src="/images/icon-check.svg"
            alt="check icon"
            className={`check_icon ${item.status ? "active" : ""}`}
            onClick={handleCheck}
          />
          <FaCircle className={item.status ? "active" : ""} />
        </span>
        <p className={item.status ? "completed" : ""}>{item.value}</p>
      </div>
      <div className="todo_action">
        <img
          src="/images/icon-cross.svg"
          alt="cross icon"
          className="delete_icon"
          onClick={handleRemoveTodo}
        />
      </div>
    </div>
  );
}

export default Todo;
