import { Route, Routes } from "react-router";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import StatsPage from "./pages/StatsPage";
import TrafficLightPage from "./pages/TrafficLightPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="traffic-light" element={<TrafficLightPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
