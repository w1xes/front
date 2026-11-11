import StatsBar from "../components/StatsBar";
import { useTrafficLights } from "../context/useTrafficLights";

function StatsPage() {
  const {
    clickCounters,
    totalClicks,
    currentSignal,
    orientation,
    isAutomatic,
    toggleOrientation,
  } = useTrafficLights();

  return (
    <>
      <h1>Статистика</h1>
      <StatsBar
        counts={clickCounters}
        totalClicks={totalClicks}
        currentSignal={currentSignal}
        orientation={orientation}
        isAutomatic={isAutomatic}
        onToggleOrientation={toggleOrientation}
      />
    </>
  );
}

export default StatsPage;
