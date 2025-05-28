const RoomList = ({ roomList, handleSelectedRooms, isSelected }) => {
  return (
    <div className="bottom-block">
      {roomList.map(room => {
        return (
          <div
            key={room.number}
            className={`room-card ${isSelected(room) ? 'selected' : ''}`}
            onClick={() => handleSelectedRooms(room)}
          >
            <p className="room-type">{room.type}</p>
            <p className="room-number">{room.number}</p>
          </div>
        )
      })}
    </div>
  )
}

export default RoomList
