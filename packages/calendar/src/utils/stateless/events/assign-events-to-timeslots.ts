import { CalendarEventInternal } from '@fischly-x/shared/src/interfaces/calendar/calendar-event.interface'
import { TimeSlot } from './generate-timeslots'
import { sortEventsByStartAndEnd } from './sort-by-start-date'

export type TimeSlotWithEvents = TimeSlot & {
  events: CalendarEventInternal[]
}

/**
 * Checks if two time ranges overlap
 * 
 * @param event1Start - Start time of first event
 * @param event1End - End time of first event  
 * @param event2Start - Start time of second event
 * @param event2End - End time of second event
 * @returns true if the events overlap, false otherwise
 */
export const doTimeRangesOverlap = (
  event1Start: Temporal.ZonedDateTime,
  event1End: Temporal.ZonedDateTime,
  event2Start: Temporal.ZonedDateTime,
  event2End: Temporal.ZonedDateTime
): boolean => {
  // Two ranges overlap if one starts before the other ends, and vice versa
  return (
    event1Start.toString() < event2End.toString() &&
    event2Start.toString() < event1End.toString()
  )
}

/**
 * Checks if two time ranges overlap (inclusive, i.e. if an event starts at the same time as the other event ends, they are considered to overlap)
 * 
 * @param event1Start - Start time of first event
 * @param event1End - End time of first event  
 * @param event2Start - Start time of second event
 * @param event2End - End time of second event
 * @returns true if the events overlap, false otherwise
 */
export const doTimeRangesOverlapInclusive = (
  event1Start: Temporal.ZonedDateTime,
  event1End: Temporal.ZonedDateTime,
  event2Start: Temporal.ZonedDateTime,
  event2End: Temporal.ZonedDateTime
): boolean => {
  // Two ranges overlap if one starts before the other ends, and vice versa
  return (
    event1Start.toString() <= event2End.toString() &&
    event2Start.toString() <= event1End.toString()
  )
}


/**
 * Assigns calendar events to time slots based on temporal overlap.
 * An event can be assigned to multiple time slots if it spans across them.
 * 
 * @param events - Array of calendar events to assign
 * @param timeSlots - Array of time slots to assign events to
 * @returns Array of time slots with their assigned events
 */
export const assignEventsToTimeSlots = (
  events: CalendarEventInternal[],
  timeSlots: TimeSlot[]
): TimeSlotWithEvents[] => {
  // Initialize time slots with empty event arrays
  const timeSlotsWithEvents: TimeSlotWithEvents[] = timeSlots.map(slot => ({
    ...slot,
    events: []
  }))
  
  // Filter events to only include timed events (not full-day events)
  // Full-day events and multi-day events are handled separately in the date grid
  const timedEvents = events.filter(event => 
    event._isSingleDayTimed || event._isSingleHybridDayTimed
  )
  
  // Assign each event to all overlapping time slots
  for (const event of timedEvents) {
    const eventStart = event.start as Temporal.ZonedDateTime
    const eventEnd = event.end as Temporal.ZonedDateTime
    
    for (const timeSlot of timeSlotsWithEvents) {
      // Check if the event overlaps with this time slot
      if (doTimeRangesOverlap(eventStart, eventEnd, timeSlot.start, timeSlot.end)) {
        timeSlot.events.push(event)
      }
    }
  }

  timeSlotsWithEvents.forEach(timeSlot => {
    timeSlot.events.sort(sortEventsByStartAndEnd);
  });
  
  return timeSlotsWithEvents
}

/**
 * Utility function to get time slots that have more events than a specified threshold
 * 
 * @param timeSlotsWithEvents - Array of time slots with events
 * @param threshold - Maximum number of events per slot before considering it "crowded"
 * @returns Array of time slots that exceed the threshold
 */
export const getCrowdedTimeSlots = (
  timeSlotsWithEvents: TimeSlotWithEvents[],
  threshold: number
): TimeSlotWithEvents[] => {
  return timeSlotsWithEvents.filter(timeSlot => timeSlot.events.length > threshold)
}
