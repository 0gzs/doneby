import { useState } from "react"
import RoomInputForm from "./components/RoomInputForm"
import TimeCalculator from "./components/TimeCalculator"
import Timeline from "./components/Timeline"

function App() {
  const [formData, setFormData] = useState({
    startTime: '8:00 AM',
    checkouts: 0,
    fullService: 0,
    stayoverService: 0
  })

  const [showResult, setShowResult] = useState(false)

  const handleCalculate = () => setShowResult(true)

  return (
    <div className="app">
      <Timeline />
      {/* <h1>DoneBy</h1>
      <RoomInputForm onFormChange={setFormData} />
      <button className="calculate-btn" onClick={handleCalculate}>Calculate</button>

      {showResult && (
        <TimeCalculator formData={formData} />
      )}*/}
    </div>
  )
}

export default App
