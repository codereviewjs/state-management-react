import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import BooksContextProvider from "./context/Books.context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BooksContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BooksContextProvider>
  </React.StrictMode>
);
