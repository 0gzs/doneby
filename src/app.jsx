import { useState } from "react"

import RoomInputForm from "./components/RoomInputForm"

function App() {
  const [formData, setFormData] = useState({
    startTime: '8:00 AM',
    checkouts: 0,
    fullService: 0,
    stayoverService: 0
  })

  const handleCalculate = () => setShowResult(true)

  return (
    <div className="app">

      <h1>DoneBy</h1>
      <RoomInputForm onFormChange={setFormData} />
      <button className="calculate-btn" onClick={handleCalculate}>Calculate</button>

    </div>
  )
}

export default App
