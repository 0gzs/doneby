import { useEffect, useState } from "react"

import RoomInputForm from "./components/RoomInputForm"
import { generateWorkData } from "./utils/timeUtils"

import RoomSelector from "./components/RoomSelector"

function App() {
  const [formInput, setFormInput] = useState()
  const [workData, setWorkData] = useState()
  const [assignedRooms, setAssignedRooms] = useState()

  const [currentView, setCurrentView] = useState('form')

  const startWorkDay = () => {
    let generated = generateWorkData(formInput)
    if (formInput) setWorkData({ ...generated })
    setCurrentView('room-select')
  }

  useEffect(() => {
    if (assignedRooms) console.log(assignedRooms)
  }, [assignedRooms])

  return (
    <div className="app">

      {currentView === 'form' && (
        <>
          <h1>DoneBy</h1>
          <RoomInputForm onFormChange={setFormInput} />
          <button className="btn" onClick={startWorkDay}>Start The Day</button>
        </>
      )}

      {currentView === 'room-select' && (
        <RoomSelector roomData={[
          {
            serviceType: 'checkouts',
            count: workData.checkouts
          },
          {
            serviceType: 'stayovers',
            count: workData.stayoverService
          },
          {
            serviceType: 'fullService',
            count: workData.fullService
          },
        ]} handleSubmission={setAssignedRooms} />
      )}

    </div>
  )
}

export default App
