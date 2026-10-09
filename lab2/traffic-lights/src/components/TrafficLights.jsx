import { useState } from "react";
import PropTypes from "prop-types";
import Light from "./Light";
import StatsBar from "./StatsBar";
import { COLORS } from "./constants";

const TrafficLights = ({ direction = "vertical" }) => {
  const [currentSignal, setCurrentSignal] = useState("red");
  const [counts, setCounts] = useState({ red: 0, yellow: 0, green: 0 });
  const [orientation, setOrientation] = useState(direction);

  const totalClicks = counts.red + counts.yellow + counts.green;

  const handleSelect = (color) => {
    setCurrentSignal(color);
    setCounts((previous) => ({ ...previous, [color]: previous[color] + 1 }));
  };

  const handleToggleOrientation = () => {
    setOrientation((previous) =>
      previous === "horizontal" ? "vertical" : "horizontal",
    );
  };

  return (
    <div className="traffic-lights">
      <div
        style={{
          display: "flex",
          flexDirection: orientation === "horizontal" ? "row" : "column",
          gap: 10,
          padding: 10,
          backgroundColor: "#333",
          borderRadius: 10,
          width: "fit-content",
        }}
      >
        {COLORS.map((color) => (
          <Light
            key={color}
            tlColor={color}
            isActive={color === currentSignal}
            onSelect={handleSelect}
          />
        ))}
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
};

export default TrafficLights;
