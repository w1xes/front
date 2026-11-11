import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PHASE_DURATION_MS, PHASES } from "../components/constants";
import TrafficLightsContext from "./trafficLightsContext";

const MANUAL_PHASE_INDEX = {
  red: 0,
  yellow: 1,
  green: 2,
};

export function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [clickCounters, setClickCounters] = useState({
    red: 0,
    yellow: 0,
    green: 0,
  });
  const [orientation, setOrientation] = useState("vertical");
  const [isAutomatic, setIsAutomatic] = useState(false);

  const currentSignal = PHASES[phaseIndex];
  const totalClicks =
    clickCounters.red + clickCounters.yellow + clickCounters.green;

  useEffect(() => {
    if (!isAutomatic) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setPhaseIndex((previousIndex) => (previousIndex + 1) % PHASES.length);
    }, PHASE_DURATION_MS);

    return () => window.clearInterval(intervalId);
  }, [isAutomatic]);

  const selectSignal = (signal) => {
    setPhaseIndex(MANUAL_PHASE_INDEX[signal]);
    setClickCounters((previous) => ({
      ...previous,
      [signal]: previous[signal] + 1,
    }));
  };

  const startAutomatic = () => setIsAutomatic(true);
  const stopAutomatic = () => setIsAutomatic(false);

  const toggleOrientation = () => {
    setOrientation((previous) =>
      previous === "horizontal" ? "vertical" : "horizontal",
    );
  };

  const value = {
    currentSignal,
    clickCounters,
    totalClicks,
    orientation,
    isAutomatic,
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
  };

  return (
    <TrafficLightsContext.Provider value={value}>
      {children}
    </TrafficLightsContext.Provider>
  );
}

TrafficLightsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
