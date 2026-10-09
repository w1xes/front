import PropTypes from "prop-types";
import { COLORS } from "./constants";
import "./StatsBar.css";

const ORIENTATION_LABELS = {
  vertical: "Вертикальна орієнтація",
  horizontal: "Горизонтальна орієнтація",
};

const StatsBar = ({
  counts,
  totalClicks,
  currentSignal,
  orientation,
  onToggleOrientation,
}) => {
  return (
    <div className="stats-bar">
      <ul className="stats-list">
        {COLORS.map((color) => (
          <li key={color}>
            <span className="stats-dot" style={{ "--dot-color": color }} />
            {color}: <strong>{counts[color]}</strong>
          </li>
        ))}
      </ul>
      <p>
        Всього кліків: <strong>{totalClicks}</strong>
      </p>
      <p>
        Поточний сигнал: <strong>{currentSignal}</strong>
      </p>
      <p>{ORIENTATION_LABELS[orientation]}</p>
      <button type="button" onClick={onToggleOrientation}>
        Перемкнути орієнтацію
      </button>
    </div>
  );
};

StatsBar.propTypes = {
  counts: PropTypes.shape({
    red: PropTypes.number.isRequired,
    yellow: PropTypes.number.isRequired,
    green: PropTypes.number.isRequired,
  }).isRequired,
  totalClicks: PropTypes.number.isRequired,
  currentSignal: PropTypes.oneOf(COLORS).isRequired,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
  onToggleOrientation: PropTypes.func.isRequired,
};

export default StatsBar;

