import { CalendarEventInternal } from '@fischly-x/shared/src/interfaces/calendar/calendar-event.interface'
import { timeFromDateTime } from '@fischly-x/shared/src/utils/stateless/time/format-conversion/string-to-string'
import {
  addTimePointsToDateTime,
  timePointsFromString,
} from '@fischly-x/shared/src/utils/stateless/time/time-points/string-conversion'
import { DayBoundariesInternal } from '@fischly-x/shared/src/types/calendar/day-boundaries'
import { timePointToPercentage } from '@fischly-x/shared/src/utils/stateless/time/interpolation/time-point-to-grid-percentage'

export const getEventHeight = (
  start: Temporal.ZonedDateTime,
  end: Temporal.ZonedDateTime,
  dayBoundaries: DayBoundariesInternal,
  pointsPerDay: number
) => {
  if (start === end) {
    return (
      timePointToPercentage(
        pointsPerDay,
        dayBoundaries,
        timePointsFromString(
          timeFromDateTime(addTimePointsToDateTime(end, 50).toString())
        )
      ) -
      timePointToPercentage(
        pointsPerDay,
        dayBoundaries,
        timePointsFromString(timeFromDateTime(start.toString()))
      )
    )
  }

  return (
    timePointToPercentage(
      pointsPerDay,
      dayBoundaries,
      timePointsFromString(timeFromDateTime(end.toString()))
    ) -
    timePointToPercentage(
      pointsPerDay,
      dayBoundaries,
      timePointsFromString(timeFromDateTime(start.toString()))
    )
  )
}

export const getInlineStartRule = (
  calendarEvent: CalendarEventInternal,
  eventWidth: number
) => {
  if (
    !calendarEvent._totalConcurrentEvents ||
    !calendarEvent._previousConcurrentEvents
  )
    return 0

  return (
    ((calendarEvent._previousConcurrentEvents || 0) /
      (calendarEvent._totalConcurrentEvents || 0)) *
    eventWidth
  )
}

export const getWidthRule = (
  leftRule: number,
  eventWidth: number,
  maxConcurrentEvents: number | undefined,
  eventOverlap: boolean
) => {
  if (eventOverlap || !maxConcurrentEvents) return eventWidth - leftRule
  return eventWidth / maxConcurrentEvents
}

export const getBorderRule = (calendarEvent: CalendarEventInternal) => {
  if (!calendarEvent._previousConcurrentEvents) return 0
  return '1px solid #fff'
}
