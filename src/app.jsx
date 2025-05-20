import { useState } from "react"
import RoomInputForm from "./components/RoomInputForm"

function App() {
  const [formData, setFormData] = useState({
    startTime: '8:00 AM',
    checkouts: 0,
    fullService: 0,
    stayovers: 0
  })
  return (
    <div className="app">
      <RoomInputForm onFormChange={setFormData} />
      <button className="calculate-btn">Calculate</button>
    </div>
  )
}

export default App
