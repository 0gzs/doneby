const RoomCard = ({ room, handleSelectedRooms = false, isSelected = false }) => {
  return (
    <div
      key={room.number}
      className={`room-card ${isSelected && isSelected(room) ? 'selected' : ''}`}
      onClick={() => handleSelectedRooms && handleSelectedRooms(room)}
    >
      <p className="room-type">{room.type}</p>
      <p className="room-number">{room.number}</p>
    </div>
  )
}

export default RoomCard
