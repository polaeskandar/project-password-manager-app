import React from "react";
import ReactDOM, { Root } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./Store";

const element: HTMLElement = document.getElementById("root") as HTMLElement;
const root: Root = ReactDOM.createRoot(element);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
