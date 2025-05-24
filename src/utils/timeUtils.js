export const generateWorkData = (data) => {
  const { startTime, checkouts, fullService, stayoverService } = data

  const exterior = 10
  const restock = 15
  const breakTime = 15
  const taskTime = breakTime + exterior + restock

  const startMins = timeStringToMinutes(startTime)
  const checkoutMins = checkouts * 25
  const fullServiceMins = fullService * 20
  const stayoverMins = stayoverService * 15

  const checkoutsCount = checkouts
  const fullServiceCount = fullService
  const stayoverCount = stayoverService

  const shiftStart = startMins
  const roomTime = checkoutMins + fullServiceMins + stayoverMins
  const breaks =
    roomTime + taskTime > 240 ? 15 : roomTime + taskTime > 480 ? 30 : 0
  const lunch = roomTime + taskTime > 360 ? 30 : 0

  const totalTime = roomTime + taskTime + lunch
  const shiftEnd = minutesToTimeString(totalTime + startMins)

  return {
    shiftStart,
    roomTime,
    exterior,
    restock,
    taskTime,
    breaks,
    lunch,
    totalTime,
    shiftEnd,
    checkouts: checkoutsCount,
    fullService: fullServiceCount,
    stayoverService: stayoverCount,
  }
}

export const timeStringToMinutes = (timeStr) => {
  const [time, modifier] = timeStr.split(" ")
  let [hours, minutes] = getHourMinutes(time)

  if (modifier === "PM" && hours !== 12) hours += 12
  if (modifier === "AM" && hours === 12) hours = 0

  return hours * 60 + minutes
}

export const minutesToTimeString = (minutes) => {
  let hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  const modifier = hours >= 12 ? "PM" : "AM"

  hours = hours % 12
  if (hours === 0) hours = 12

  const paddedMins = mins.toString().padStart(2, "0")
  return `${hours}:${paddedMins} ${modifier}`
}

export const getHourMinutes = (time) => {
  let [hours, minutes] = time.split(":").map(Number)
  return [hours, minutes]
}

export const generateHourlyTimeline = (shiftStart, shiftEnd) => {
  let end = timeStringToMinutes(shiftEnd)
  const result = []

  let currentMins = shiftStart

  while (currentMins <= end) {
    result.push(minutesToTimeString(currentMins))
    currentMins += 60
  }

  return result
}

export const formatTimeForDisplay = (time) => {
  console.log(time)
}
