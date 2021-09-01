import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import Header from "./components/Header";
import Todo from "./components/Todo";
import Filters from "./components/Filters";
import Attribution from "./components/Attribution";

import "./sass/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

export { Header, Todo, Filters, Attribution };
