import { calculateClockOut } from "../utils/timeUtils"

const TimeCalculator = ({ formData }) => {
  const { roomTime, taskTime, lunchTime, totalTime, clockOut } = calculateClockOut(formData)

  return (
    <div>
      <p>Room Time: {roomTime}</p>
      <p>Tasks: {taskTime}</p>
      <p>Lunch?: {lunchTime === 0 ? 'No Lunch' : '30 mins'}</p>
      <p>Total Time: {totalTime}</p>
      <p>Clock out: {clockOut}</p>
    </div>
  )
}

export default TimeCalculator
