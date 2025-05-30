import RoomCard from "./RoomCard"

const RoomList = ({ roomList, handleSelectedRooms, isSelected }) => {
  return (
    <div className="flex-wrap">
      {roomList.map((room, i) => {
        return (
          <RoomCard
            key={i}
            room={room}
            handleSelectedRooms={handleSelectedRooms}
            isSelected={isSelected}
          />
        )
      })}
    </div>
  )
}

export default RoomList
