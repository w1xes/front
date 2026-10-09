import PropTypes from "prop-types";
import "./Light.css";

const Light = ({ tlColor = "red", isActive = false, onSelect }) => {
  return (
    <button
      type="button"
      aria-label={`Сигнал ${tlColor}`}
      aria-pressed={isActive}
      onClick={() => onSelect?.(tlColor)}
      className={`light${isActive ? " light--active" : ""}`}
      style={{ "--light-color": tlColor }}
    ></button>
  );
};

Light.propTypes = {
  tlColor: PropTypes.string,
  isActive: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default Light;

