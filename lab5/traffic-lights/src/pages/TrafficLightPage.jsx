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
    serverTrafficLights,
    loadStatus,
    loadError,
    saveStatus,
    saveError,
    reloadTrafficLights,
    saveCurrentSignal,
  } = useTrafficLights();

  const savedSignal = serverTrafficLights.find(
    ({ id }) => id === "main",
  )?.currentSignal;

  return (
    <>
      <h1>Світлофор</h1>
      {loadStatus === "loading" && (
        <p className="server-status" role="status" aria-live="polite">
          Завантаження даних світлофора…
        </p>
      )}
      {loadStatus === "error" && (
        <div className="server-status server-status--error" role="alert">
          <p>Не вдалося завантажити збережений серверний стан.</p>
          <p>{loadError}</p>
          <button type="button" onClick={reloadTrafficLights}>
            Повторити
          </button>
        </div>
      )}
      {loadStatus === "success" && (
        <>
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
          <section className="server-save" aria-label="Збереження сигналу">
            <p role="status" aria-live="polite">
              Серверні дані завантажено.
            </p>
            <p>
              Збережений на сервері сигнал: <strong>{savedSignal}</strong>
            </p>
            <button
              type="button"
              onClick={saveCurrentSignal}
              disabled={saveStatus === "loading"}
            >
              {saveStatus === "loading"
                ? "Збереження…"
                : "Зберегти поточний сигнал"}
            </button>
            {saveStatus === "loading" && (
              <p role="status" aria-live="polite">
                Збереження сигналу на сервері…
              </p>
            )}
            {saveStatus === "success" && (
              <p role="status" aria-live="polite">
                Сигнал {savedSignal} збережено на сервері.
              </p>
            )}
            {saveStatus === "error" && (
              <p className="server-status--error" role="alert">
                Не вдалося підтвердити збереження на сервері: {saveError}
              </p>
            )}
          </section>
        </>
      )}
    </>
  );
}

export default TrafficLightPage;
