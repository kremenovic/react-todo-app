import React from "react";

function Filters({
  filterAllTodos,
  filterActiveTodos,
  filterCompletedTodos,
  handleActiveClass,
}) {
  return (
    <>
      <div className="filters">
        <span
          onClick={(e) => {
            filterAllTodos();
            handleActiveClass(e);
          }}
          className="active"
        >
          All
        </span>
        <span
          onClick={(e) => {
            filterActiveTodos();
            handleActiveClass(e);
          }}
        >
          Active
        </span>
        <span
          onClick={(e) => {
            filterCompletedTodos();
            handleActiveClass(e);
          }}
        >
          Completed
        </span>
      </div>
    </>
  );
}

export default Filters;
