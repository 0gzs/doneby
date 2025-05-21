import { useEffect, useState } from 'react'
import '../styles/timeline.css'
import { generateHourlyTimeline, timeStringToMinutes } from '../utils/timeUtils'

const TASKS_DATA = [
  {
    type: 'checkout',
    start: '8:00 AM',
    end: '8:30 AM',
    label: 'Room 201 -- Checkout'
  },
  {
    type: 'stayover',
    start: '8:30 AM',
    end: '9:00 AM',
    label: 'Room 211 -- Stayover'
  },
  {
    type: 'checkout',
    start: '9:00 AM',
    end: '9:20 AM',
    label: 'Room 108 -- Checkout'
  },
  {
    type: 'full-service',
    start: '9:20 AM',
    end: '9:30 AM',
    label: 'Room 133 -- Full-service'
  },
  {
    type: 'checkout',
    start: '9:30 AM',
    end: '10:00 AM',
    label: 'Room 130 -- Checkout'
  },
  {
    type: 'stayover',
    start: '10:00 AM',
    end: '10:30 AM',
    label: 'Room 130 -- Stayover'
  },
  {
    type: 'break',
    start: '10:30 AM',
    end: '10:45 AM',
    label: 'Break'
  }
]

const Timeline = () => {
  const startTime = '8:00 AM'
  const endTime = '2:00 PM'

  const [workHours, setWorkHours] = useState([])
  const [formattedTaskData, setFormattedTaskData] = useState([])

  const calculateDurationWidth = (start, end) => {
    return end - start
  }

  useEffect(() => {
    const hours = generateHourlyTimeline(startTime, endTime)
    if (workHours.length === 0) {
      setWorkHours([...hours])
    }
  }, [workHours])

  useEffect(() => {
    if (workHours.length > 0) {
      const updatedTaskData = TASKS_DATA.map(task => {
        const start = timeStringToMinutes(task.start)
        const end = timeStringToMinutes(task.end)
        const duration = calculateDurationWidth(start, end)
        return { ...task, duration }
      })
      setFormattedTaskData(updatedTaskData)
    }
  }, [workHours])

  useEffect(() => {
    if (formattedTaskData.length > 0) {
      console.log(formattedTaskData)
    }
  }, [formattedTaskData])

  return (
    <div className="timeline">
      <div className='timeline--hours'>
        <div className='timeline--hours_strings'>
          {workHours.map((hour, id) => {
            return <div key={id} className="timeline--hour_container">
              <div className='timeline--hour'>{hour}</div>
              <div className='timeline--hour_break'></div>
            </div>
          })}
        </div>
        <div className='timeline--hours_blocks'>
          {formattedTaskData.map((taskData, id) => {
            return (
              <div
                key={id}
                className={`timeline--box timeline--box_${taskData.type}`}
                style={{
                  width: `${(taskData.duration / 60) * 18 - .2}rem`,
                  left: `${((timeStringToMinutes(taskData.start) - timeStringToMinutes(startTime)) / 60) * 18}rem`,
                  position: 'absolute'
                }}
              >
                {taskData.type[0]}
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}

export default Timeline
