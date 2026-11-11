import TrafficLights from "../components/TrafficLights";
import { useTrafficLights } from "../context/useTrafficLights";

function TrafficLightPage() {
  const {
    currentSignal,
    clickCounters,
    totalClicks,
    orientation,
    isAutomatic,
    selectSignal,
    startAutomatic,
    stopAutomatic,
    toggleOrientation,
  } = useTrafficLights();

  return (
    <>
      <h1>Світлофор</h1>
      <TrafficLights
        currentSignal={currentSignal}
        clickCounters={clickCounters}
        totalClicks={totalClicks}
        orientation={orientation}
        isAutomatic={isAutomatic}
        onSelectSignal={selectSignal}
        onStartAutomatic={startAutomatic}
        onStopAutomatic={stopAutomatic}
        onToggleOrientation={toggleOrientation}
      />
    </>
  );
}

export default TrafficLightPage;
