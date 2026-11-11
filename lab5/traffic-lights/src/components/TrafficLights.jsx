import PropTypes from "prop-types";
import Light from "./Light";
import StatsBar from "./StatsBar";
import "./TrafficLights.css";
import { COLORS } from "./constants";

const TrafficLights = ({
  currentSignal,
  isAutomatic,
  orientation,
  clickCounters,
  totalClicks,
  onSelectSignal,
  onStartAutomatic,
  onStopAutomatic,
  onToggleOrientation,
}) => {

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
            onSelect={onSelectSignal}
          />
        ))}
      </div>

      <div className="traffic-lights__controls">
        <button
          type="button"
          onClick={onStartAutomatic}
          disabled={isAutomatic}
        >
          Запустити
        </button>
        <button
          type="button"
          onClick={onStopAutomatic}
          disabled={!isAutomatic}
        >
          Зупинити
        </button>
        <span className="traffic-lights__mode" role="status" aria-live="polite">
          Режим: {isAutomatic ? "автоматичний" : "ручний"}
        </span>
      </div>

      <StatsBar
        counts={clickCounters}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        isAutomatic={isAutomatic}
        onToggleOrientation={onToggleOrientation}
      />
    </div>
  );
};

TrafficLights.propTypes = {
  currentSignal: PropTypes.oneOf(COLORS).isRequired,
  isAutomatic: PropTypes.bool.isRequired,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
  clickCounters: PropTypes.shape({
    red: PropTypes.number.isRequired,
    yellow: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
  }).isRequired,
  totalClicks: PropTypes.number.isRequired,
  onSelectSignal: PropTypes.func.isRequired,
  onStartAutomatic: PropTypes.func.isRequired,
  onStopAutomatic: PropTypes.func.isRequired,
  onToggleOrientation: PropTypes.func.isRequired,
};

export default TrafficLights;
