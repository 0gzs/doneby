import { CHECKOUTS_TIME, FULL_SERVICE_TIME, minutesToHoursString, minutesToTimeString, STAYOVERS_TIME } from "../utils/timeUtils"
import RoomCard from "./RoomCard"

const Review = ({ assignedRooms, workData, reset }) => {

  const getTotalRooms = () => {
    let total = 0
    const objectLists = Object.entries(assignedRooms).map(list => list[1].length)
    return objectLists.reduce((a, c) => a + c, total)
  }
  return (
    <div className="main-layout">
      <div className="header-bar">
        <p className="title">Your day in review</p>
        <div className='selector-btns'>
          <button
            className="btn"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="section-card">
        <p>Total rooms: {getTotalRooms()}</p>
        <p>Start: {minutesToTimeString(workData.shiftStart)} · End: {minutesToTimeString(workData.shiftEnd)}</p>
        <div className="summary-breaks">
          <p>10 minute exterior</p>
          <p>•</p>
          <p>15 minute break</p>
          <p>•</p>
          <p>15 minutes restocking cart</p>
        </div>
        <p className="sm-font">{workData.lunch ? '*Includes Lunch' : 'No Lunch Taken'}</p>
        <p>That's a total of {minutesToHoursString(workData.totalTime)}</p>
      </div>


      <div className="scrollable flex-col">
        {Object.entries(assignedRooms).map(([key, value]) => {
          if (!workData[key]) return
          let roomTime

          if (key === 'checkouts') roomTime = workData[key] * CHECKOUTS_TIME
          if (key === 'fullService') roomTime = workData[key] * FULL_SERVICE_TIME
          if (key === 'stayovers') roomTime = workData[key] * STAYOVERS_TIME

          return (
            <div key={key} className="section-card">
              <p className="md-heading">{
                key.charAt(0).toUpperCase() + key.slice(1)} - {workData[key]}</p>
              <div className="horizontal-flow" >
                {value.map((room, i) => {
                  return (
                    <RoomCard key={i} room={room} />
                  )
                })}
              </div>
              <p className="sm-font">Total expected time: {minutesToHoursString(roomTime)}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Review
