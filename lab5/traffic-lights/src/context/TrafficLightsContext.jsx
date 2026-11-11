import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PHASE_DURATION_MS, PHASES } from "../components/constants";
import {
  listTrafficLights,
  updateTrafficLightState,
} from "../api/trafficLightsApi";
import TrafficLightsContext from "./trafficLightsContext";

const MANUAL_PHASE_INDEX = {
  red: 0,
  yellow: 1,
  green: 2,
};

async function loadServerTrafficLights() {
  const trafficLights = await listTrafficLights();
  const mainTrafficLight = trafficLights.find(({ id }) => id === "main");

  if (!mainTrafficLight) {
    throw new Error('Відповідь сервера не містить запис світлофора "main".');
  }

  return { trafficLights, mainTrafficLight };
}

function getErrorMessage(error, fallback) {
  return error instanceof Error ? error.message : fallback;
}

export function TrafficLightsProvider({ children }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [clickCounters, setClickCounters] = useState({
    red: 0,
    yellow: 0,
    green: 0,
  });
  const [orientation, setOrientation] = useState("vertical");
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [serverTrafficLights, setServerTrafficLights] = useState([]);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [loadError, setLoadError] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [saveError, setSaveError] = useState("");

  const currentSignal = PHASES[phaseIndex];
  const totalClicks =
    clickCounters.red + clickCounters.yellow + clickCounters.green;

  const reloadTrafficLights = useCallback(async () => {
    setLoadStatus("loading");
    setLoadError("");
    setSaveStatus("idle");
    setSaveError("");

    try {
      const { trafficLights, mainTrafficLight } =
        await loadServerTrafficLights();
      setServerTrafficLights(trafficLights);
      setPhaseIndex(PHASES.indexOf(mainTrafficLight.currentSignal));
      setLoadStatus("success");
    } catch (error) {
      setLoadError(getErrorMessage(
        error,
        "Сталася невідома помилка під час завантаження даних світлофора.",
      ));
      setLoadStatus("error");
    }
  }, []);

  const saveCurrentSignal = useCallback(async () => {
    if (saveStatus === "loading") {
      return;
    }

    setSaveStatus("loading");
    setSaveError("");

    try {
      const updatedTrafficLight = await updateTrafficLightState(
        "main",
        currentSignal,
      );

      setServerTrafficLights((previousTrafficLights) =>
        previousTrafficLights.map((trafficLight) =>
          trafficLight.id === updatedTrafficLight.id
            ? updatedTrafficLight
            : trafficLight,
        ),
      );
      setSaveStatus("success");
    } catch (error) {
      setSaveError(getErrorMessage(
        error,
        "Сталася невідома помилка під час збереження сигналу світлофора.",
      ));
      setSaveStatus("error");
    }
  }, [currentSignal, saveStatus]);

  useEffect(() => {
    let isCurrentRequest = true;

    loadServerTrafficLights()
      .then(({ trafficLights, mainTrafficLight }) => {
        if (!isCurrentRequest) {
            return;
        }

        setServerTrafficLights(trafficLights);
        setPhaseIndex(PHASES.indexOf(mainTrafficLight.currentSignal));
        setLoadStatus("success");
      })
      .catch((error) => {
        if (!isCurrentRequest) {
            return;
        }

        setLoadError(getErrorMessage(
            error,
            "Сталася невідома помилка під час завантаження даних світлофора.",
        ));
        setLoadStatus("error");
      });

    return () => {
      isCurrentRequest = false;
    };
  }, []);

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
    serverTrafficLights,
    loadStatus,
    loadError,
    saveStatus,
    saveError,
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
    reloadTrafficLights,
    saveCurrentSignal,
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
