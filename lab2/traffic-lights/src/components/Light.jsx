import PropTypes from "prop-types";

const Light = ({ tlColor = "red", isActive = false, onSelect }) => {
  return (
    <button
      type="button"
      aria-label={`Сигнал ${tlColor}`}
      aria-pressed={isActive}
      onClick={() => onSelect?.(tlColor)}
      style={{
        backgroundColor: tlColor,
        width: 50,
        height: 50,
        borderRadius: "50%",
        border: isActive ? "3px solid #fff" : "3px solid transparent",
        padding: 0,
        cursor: onSelect ? "pointer" : "default",
        opacity: isActive ? 1 : 0.3,
        boxShadow: isActive ? `0 0 16px 4px ${tlColor}` : "none",
        transition: "opacity 0.2s, box-shadow 0.2s",
      }}
    ></button>
  );
};

Light.propTypes = {
  tlColor: PropTypes.string,
  isActive: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default Light;
