import TrafficLights from './components/TrafficLights'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Traffic Lights</h1>

      <div className="demo">
        <h2>Горизонтальний</h2>
        <TrafficLights direction="horizontal" />
      </div>

      <div className="demo">
        <h2>Вертикальний</h2>
        <TrafficLights direction="vertical" />
      </div>
    </div>
  )
}

export default App
