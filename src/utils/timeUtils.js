const BREAK = 15
const RESTOCK = 15
const MORNING_EXTERIOR = 10

export const calculateClockOut = (data) => {
  const { startTime, checkouts, fullService, stayoverService } = data

  const startMins = timeStringToMinutes(startTime)
  const checkoutMins = checkouts * 25
  const fullServiceMins = fullService * 20
  const stayoverMins = stayoverService * 15

  const roomTime = checkoutMins + fullServiceMins + stayoverMins
  const taskTime = BREAK + RESTOCK + MORNING_EXTERIOR
  const lunchTime = roomTime + taskTime > 360 ? 30 : 0

  const totalTime = roomTime + taskTime + lunchTime
  const clockOut = minutesToTimeString(totalTime + startMins)

  return { roomTime, taskTime, lunchTime, totalTime, clockOut }
}

export const timeStringToMinutes = (timeStr) => {
  const [time, modifier] = timeStr.split(" ")
  let [hours, minutes] = time.split(":").map(Number)

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
