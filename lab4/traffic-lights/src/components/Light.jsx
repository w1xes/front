import PropTypes from "prop-types";
import "./Light.css";

const Light = ({
  tlColor = "red",
  isActive = false,
  isDisabled = false,
  onSelect,
}) => (
  <button
    type="button"
    aria-label={`Сигнал ${tlColor}`}
    aria-pressed={isActive}
    disabled={isDisabled}
    onClick={() => onSelect?.(tlColor)}
    className={`light${isActive ? " light--active" : ""}`}
    style={{ "--light-color": tlColor }}
  />
);

Light.propTypes = {
  tlColor: PropTypes.string,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default Light;
