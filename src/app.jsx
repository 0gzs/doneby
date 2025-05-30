import { useEffect, useState } from "react"

import RoomInputForm from "./components/RoomInputForm"
import { generateWorkData } from "./utils/timeUtils"

import RoomSelector from "./components/RoomSelector"
import RoomCard from "./components/RoomCard"
import Review from "./components/Review"

function App() {
  const [formInput, setFormInput] = useState()
  const [workData, setWorkData] = useState()
  const [assignedRooms, setAssignedRooms] = useState()

  const [currentView, setCurrentView] = useState('form')

  const startWorkDay = () => {
    if (formInput.checkouts === 0 && formInput.stayovers === 0 && formInput.fullService === 0) return
    let generated = generateWorkData(formInput)
    if (formInput) setWorkData({ ...generated })
    setCurrentView('room-select')
  }

  const reset = () => {
    setFormInput(null)
    setWorkData(null)
    setAssignedRooms(null)
    setCurrentView('form')
  }

  useEffect(() => {
    if (assignedRooms) setCurrentView('review')
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
            count: workData.stayovers
          },
          {
            serviceType: 'fullService',
            count: workData.fullService
          },
        ]} handleSubmission={setAssignedRooms} />
      )}

      {currentView === 'review' && (
        <Review
          assignedRooms={assignedRooms}
          reset={reset}
          workData={workData}
        />
      )}

    </div>
  )
}

export default App
