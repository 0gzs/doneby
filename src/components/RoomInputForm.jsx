import { useState } from "react"

const RoomInputForm = () => {
  const [startTime, setStartTime] = useState(8)
  const startTimes = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM'
  ]
  const [checkouts, setCheckouts] = useState(0)
  const [fullService, setFullService] = useState(0)
  const [stayoverService, setStayoverService] = useState(0)

  const calculateServiceTime = e => {
    const type = e.target.name
    const amount = parseInt(e.target.value)

    switch (type) {
      case 'checkout':
        setCheckouts(amount)
        break
      case 'full':
        setFullService(amount)
        break
      case 'stayovers':
        setStayoverService(amount)
        break
      default:
        break
    }
  }

  const handleStartTime = (e) => setStartTime(e.target.value)

  return (
    <div className="room-input-form">
      <span>
        <label htmlFor="startTime" className='font-bold'>Start Time: </label>
        <select id="startTime" value={startTime} onChange={handleStartTime}>
          <option value="">-- Select</option>
          {startTimes.map((time, id) => (
            <option key={id} value={time}>
              {time}
            </option>
          ))}
        </select>
      </span>

      <span>
        <p>Checkouts</p>
        <input
          name='checkout'
          type='number'
          min='0'
          value={checkouts}
          onChange={calculateServiceTime} />
      </span>

      <span>
        <p>Full-Service</p>
        <input
          name='full'
          type='number'
          min='0'
          value={fullService}
          onChange={calculateServiceTime} />
      </span>

      <span>
        <p>Stayovers</p>
        <input
          name='stayovers'
          type='number'
          min='0'
          value={stayoverService}
          onChange={calculateServiceTime} />
      </span>

      <button className="calculate-btn">Calculate</button>
    </div>
  )
}

export default RoomInputForm
