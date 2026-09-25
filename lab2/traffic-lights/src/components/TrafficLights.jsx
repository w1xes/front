import PropTypes from "prop-types";
import Light from "./Light";

const TRAFFIC_LIGHT_COLORS = ["red", "yellow", "green"];

const TrafficLights = ({ direction = "horizontal" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        gap: 10,
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 10,
        width: "fit-content",
      }}
    >
      {TRAFFIC_LIGHT_COLORS.map((color) => (
        <Light key={color} tlColor={color} />
      ))}
    </div>
  );
};

TrafficLights.propTypes = {
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
};

export default TrafficLights;
