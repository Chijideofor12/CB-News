import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { VoteProvider } from "./Components/VoteContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <VoteProvider>
      <App />
    </VoteProvider>
  </BrowserRouter>
);
