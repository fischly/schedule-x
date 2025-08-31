import { timeStringFromTimePoints } from '@fischly-x/shared/src/utils/stateless/time/time-points/string-conversion'

export type TimeSlot = {
  id: string
  start: Temporal.ZonedDateTime
  end: Temporal.ZonedDateTime
  startTimePoints: number
  endTimePoints: number
}

/**
 * Generates time slots for one day given start and end boundaries and slot duration
 * 
 * @param date - The date for which to generate time slots
 * @param dayBoundariesStart - Start boundary in time points (e.g. 800 for 8:00 AM)
 * @param dayBoundariesEnd - End boundary in time points (e.g. 1800 for 6:00 PM)
 * @param slotDurationMinutes - Duration of each slot in minutes (e.g. 60 for 1-hour slots)
 * @param timezone - Timezone for the date
 * @returns Array of time slots for the day
 */
export const generateTimeslots = (
  date: Temporal.PlainDate,
  dayBoundariesStart: number,
  dayBoundariesEnd: number,
  slotDurationMinutes: number,
  timezone: string
): TimeSlot[] => {
  const timeSlots: TimeSlot[] = []
  
  // Convert slot duration to time points (Schedule-X uses a special time point system)
  // 1 minute = 1.6666... time points (100 time points = 60 minutes)
  const slotDurationTimePoints = (slotDurationMinutes * 100) / 60
  
  let currentTimePoint = dayBoundariesStart
  let slotIndex = 0
  
  // TODO: check case when dayBoundariesStart > dayBoudariesEnd (e.g. start 600, end 300)
  while (currentTimePoint < dayBoundariesEnd) {
    const nextTimePoint = Math.min(
      currentTimePoint + slotDurationTimePoints,
      dayBoundariesEnd
    )
    
    // Convert time points to time strings
    const startTimeString = timeStringFromTimePoints(currentTimePoint)
    const endTimeString = timeStringFromTimePoints(nextTimePoint)
    
    // Parse time strings to get hours and minutes
    const [startHour, startMinute] = startTimeString.split(':').map(Number)
    const [endHour, endMinute] = endTimeString.split(':').map(Number)
    
    // Create ZonedDateTime objects for the slot boundaries
    const slotStart = Temporal.ZonedDateTime.from({
      year: date.year,
      month: date.month,
      day: date.day,
      hour: startHour,
      minute: startMinute,
      second: 0,
      timeZone: timezone,
    })
    
    let slotEnd = Temporal.ZonedDateTime.from({
      year: date.year,
      month: date.month,
      day: date.day,
      hour: endHour === 24 ? 23 : endHour,
      minute: endHour === 24 ? 59 : endMinute,
      second: endHour === 24 ? 59 : 0,
      timeZone: timezone,
    })
    
    // Handle end of day boundary (24:00)
    if (endHour === 24 || nextTimePoint === 2400) {
      slotEnd = slotStart.add({ days: 1 }).with({ 
        hour: 0, 
        minute: 0, 
        second: 0 
      })
    }
    
    const timeSlot: TimeSlot = {
      id: `slot-${date.toString()}-${slotIndex}`,
      start: slotStart,
      end: slotEnd,
      startTimePoints: currentTimePoint,
      endTimePoints: nextTimePoint,
    }
    
    timeSlots.push(timeSlot)
    
    currentTimePoint = nextTimePoint
    slotIndex++
  }
  
  return timeSlots
}
