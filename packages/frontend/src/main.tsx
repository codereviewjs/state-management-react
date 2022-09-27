import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthorsContextProvider from "./context/Authors.context";
import BooksContextProvider from "./context/Books.context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthorsContextProvider>
      <BooksContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BooksContextProvider>
    </AuthorsContextProvider>
  </React.StrictMode>
);
