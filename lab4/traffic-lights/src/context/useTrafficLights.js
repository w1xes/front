import { useContext } from "react";
import TrafficLightsContext from "./trafficLightsContext";

export function useTrafficLights() {
  const context = useContext(TrafficLightsContext);

  if (context === null) {
    throw new Error(
      "useTrafficLights must be used within a TrafficLightsProvider",
    );
  }

  return context;
}
