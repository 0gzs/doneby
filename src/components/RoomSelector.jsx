import { useEffect, useState } from 'react'
import '../styles/room-selector.css'

import staticRoomList from '../data/room-list.json'
import RoomList from './RoomList'

const serviceTypes = ['checkouts', 'stayovers', 'fullService']

const RoomSelector = ({ roomData, handleSubmission }) => {
  const [serviceTypeHeader, setServiceTypeHeader] = useState('checkouts')
  const [roomList, setRoomList] = useState(staticRoomList)
  const [selectedRooms, setSelectedRooms] = useState({
    checkouts: [],
    stayovers: [],
    fullService: []
  })
  const [serviceTypeRoomCount, setServiceTypeRoomCount] = useState()

  const handleSelectedRooms = room => {
    const currentList = selectedRooms[serviceTypeHeader]
    const exists = currentList.find(r => r.number === room.number)
    let updatedList

    if (exists) {
      updatedList = currentList.filter(r => r.number !== room.number)
    } else {
      if (serviceTypeRoomCount <= 0) return
      updatedList = [...currentList, room]
    }

    setSelectedRooms(prev => ({
      ...prev,
      [serviceTypeHeader]: updatedList
    }))
  }

  const handleNextType = () => {
    const currentType = roomData.find(r => r.serviceType === serviceTypeHeader)
    if (!currentType) return

    const currentIndex = serviceTypes.indexOf(serviceTypeHeader)
    if (currentIndex === -1) return

    if (selectedRooms[serviceTypeHeader].length !== currentType.count) return

    for (let i = currentIndex + 1; i <= serviceTypes.length; i++) {
      const nextType = serviceTypes[i]
      const nextTypeData = roomData.find(r => r.serviceType === nextType)

      if (nextType && nextTypeData && nextTypeData.count > 0) {
        setServiceTypeHeader(nextType)
        return
      }
    }

    handleSubmission(selectedRooms)
  }

  const isSelected = room => {
    const list = selectedRooms[serviceTypeHeader]
    return list.some(r => r.number === room.number)
  }

  useEffect(() => {
    const skipInitialTypeIfNeeded = () => {
      for (let i = 0; i < serviceTypes.length; i++) {
        const type = serviceTypes[i]
        const typeData = roomData.find(r => r.serviceType === type)

        if (typeData && typeData.count > 0) {
          setServiceTypeHeader(type)
          return
        }
      }

      handleSubmission(selectedRooms)
    }

    skipInitialTypeIfNeeded()
  }, [])

  useEffect(() => {
    if (serviceTypeHeader && selectedRooms) {
      const currentType = roomData.find(r => r.serviceType === serviceTypeHeader)
      if (!currentType) return

      const list = selectedRooms[serviceTypeHeader]
      setServiceTypeRoomCount(currentType.count - list.length)
    }
  }, [serviceTypeHeader, selectedRooms])


  useEffect(() => {
    const selectedNumbers = new Set(
      Object.values(selectedRooms).flat().map(room => room.number)
    )

    const availableRooms = staticRoomList.filter(
      room => !selectedNumbers.has(room.number)
    )

    setRoomList(availableRooms)
  }, [serviceTypeHeader])


  return (
    <div className="main-container">

      <div className='block'>

        <p className='room-select-title'>
          {serviceTypeHeader === 'fullService' ?
            'Full Service'
            : serviceTypeHeader.charAt(0).toUpperCase() + serviceTypeHeader.slice(1)} ({serviceTypeRoomCount})
        </p>


        <div className='selector-btns'>
          <button
            className="btn"
            disabled={serviceTypeRoomCount > 0}
            onClick={handleNextType}
          >
            Next
          </button>
        </div>
      </div>

      {selectedRooms && (
        <RoomList
          roomList={roomList}
          selectedRooms={selectedRooms}
          handleSelectedRooms={handleSelectedRooms}
          isSelected={isSelected}
        />
      )}
    </div>
  )
}

export default RoomSelector
