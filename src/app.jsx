import { useEffect, useState } from "react"

import RoomInputForm from "./components/RoomInputForm"
import { generateWorkData } from "./utils/timeUtils"

import RoomSelector from "./components/RoomSelector"
import Review from "./components/Review"

const STORAGE_KEY = 'doneby-session'

const saveSession = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const loadSession = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

const clearSession = () => {
  localStorage.removeItem(STORAGE_KEY)
}

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
    clearSession()
  }

  useEffect(() => {
    const existing = loadSession()
    if (existing?.workData && existing?.assignedRooms) {
      setWorkData(existing.workData)
      setAssignedRooms(existing.assignedRooms)
      setCurrentView('review')
    }
  }, [])

  useEffect(() => {
    if (assignedRooms && workData) {
      saveSession({ workData, assignedRooms })
      setCurrentView('review')
    }
  }, [assignedRooms])

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
