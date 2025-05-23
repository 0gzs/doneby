import { useEffect, useState } from "react"

const RoomInputForm = ({ onFormChange }) => {
  const [startTime, setStartTime] = useState('8:00 AM')
  const [checkouts, setCheckouts] = useState(0)
  const [fullService, setFullService] = useState(0)
  const [stayoverService, setStayoverService] = useState(0)

  useEffect(() => {
    onFormChange({ startTime, checkouts, fullService, stayoverService })
  }, [startTime, checkouts, fullService, stayoverService, onFormChange])

  const handlRoomChange = e => {
    const { name, value } = e.target
    const parsedValue = parseInt(value, 10) || 0

    switch (name) {
      case 'checkout':
        setCheckouts(parsedValue)
        break
      case 'full':
        setFullService(parsedValue)
        break
      case 'stayovers':
        setStayoverService(parsedValue)
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
        <select value={startTime} onChange={handleStartTime}>
          {['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM'].map((time, id) => {
            return <option key={id} value={time}>{time}</option>
          })}
        </select>
      </span>

      <span>
        <p>Checkouts</p>
        <input
          name='checkout'
          type='number'
          min='0'
          value={checkouts.toString()}
          onChange={handlRoomChange} />
      </span>

      <span>
        <p>Full-Service</p>
        <input
          name='full'
          type='number'
          min='0'
          value={fullService.toString()}
          onChange={handlRoomChange} />
      </span>

      <span>
        <p>Stayovers</p>
        <input
          name='stayovers'
          type='number'
          min='0'
          value={stayoverService.toString()}
          onChange={handlRoomChange} />
      </span>
    </div>
  )
}

export default RoomInputForm
