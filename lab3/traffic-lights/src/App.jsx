import { useState } from "react";
import TrafficLights from "./components/TrafficLights";
import "./App.css";

function App() {
  const [totalLightClicks, setTotalLightClicks] = useState(0);

  const handleLightClick = () => {
    setTotalLightClicks((previousTotal) => previousTotal + 1);
  };

  return (
    <main className="app">
      <h1>Світлофор</h1>
      <p aria-live="polite">
        Загальна кількість натискань на світлофорах:{" "}
        <strong>{totalLightClicks}</strong>
      </p>
      <TrafficLights onManualClick={handleLightClick} />
      <TrafficLights onManualClick={handleLightClick} />
      <TrafficLights onManualClick={handleLightClick} />

    </main>
  );
}

export default App;
