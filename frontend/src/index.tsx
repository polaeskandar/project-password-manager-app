import React from "react";
import ReactDOM, { Root } from "react-dom/client";

import "./index.css";
import App from "./App";

const element: HTMLElement = document.getElementById("root") as HTMLElement;
const root: Root = ReactDOM.createRoot(element);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
