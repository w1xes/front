import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Light from "./Light";
import StatsBar from "./StatsBar";
import "./TrafficLights.css";
import { COLORS, PHASE_DURATION_MS, PHASES } from "./constants";

const MANUAL_PHASE_INDEX = {
  red: 0,
  yellow: 1,
  green: 2,
};

const TrafficLights = ({ direction = "vertical", onManualClick }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [counts, setCounts] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState(direction);

  const currentSignal = PHASES[phaseIndex];
  const totalClicks = counts.red + counts.yellow + counts.green;

  useEffect(() => {
    if (!isAutomatic) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setPhaseIndex((previousIndex) => (previousIndex + 1) % PHASES.length);
    }, PHASE_DURATION_MS);

    return () => window.clearInterval(intervalId);
  }, [isAutomatic]);

  const handleSelect = (color) => {
    setPhaseIndex(MANUAL_PHASE_INDEX[color]);
    setCounts((previous) => ({ ...previous, [color]: previous[color] + 1 }));
    onManualClick();
  };

  const handleToggleOrientation = () => {
    setOrientation((previous) =>
      previous === "horizontal" ? "vertical" : "horizontal",
    );
  };

  return (
    <div className="traffic-lights">
      <div
        className={`traffic-lights__panel traffic-lights__panel--${orientation}`}
        aria-label="Світлофор"
      >
        {COLORS.map((color) => (
          <Light
            key={color}
            tlColor={color}
            isActive={color === currentSignal}
            isDisabled={isAutomatic}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="traffic-lights__controls">
        <button
          type="button"
          onClick={() => setIsAutomatic(true)}
          disabled={isAutomatic}
        >
          Запустити
        </button>
        <button
          type="button"
          onClick={() => setIsAutomatic(false)}
          disabled={!isAutomatic}
        >
          Зупинити
        </button>
        <span className="traffic-lights__mode" role="status" aria-live="polite">
          Режим: {isAutomatic ? "автоматичний" : "ручний"}
        </span>
      </div>

      <StatsBar
        counts={counts}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        onToggleOrientation={handleToggleOrientation}
        
      />
    </div>
  );
};

TrafficLights.propTypes = {
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  onManualClick: PropTypes.func.isRequired,
};

export default TrafficLights;
