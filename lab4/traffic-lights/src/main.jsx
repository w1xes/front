import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { TrafficLightsProvider } from "./context/TrafficLightsContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TrafficLightsProvider>
        <App />
      </TrafficLightsProvider>
    </BrowserRouter>
  </StrictMode>,
);
