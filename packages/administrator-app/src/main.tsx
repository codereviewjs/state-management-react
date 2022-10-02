import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "ui/dist/style.css";

import App from "./App";
import StoreContextProvider from "./context/store/Store.context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContextProvider>
  </React.StrictMode>
);
