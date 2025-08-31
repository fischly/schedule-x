import { CalendarEventInternal } from "@fischly-x/shared/src/interfaces/calendar/calendar-event.interface";
import { sortEventsByStartAndEnd } from "./sort-by-start-date";
import { assignEventsToTimeSlots } from "./assign-events-to-timeslots";
import { generateTimeslots } from "./generate-timeslots";
import { DayBoundariesInternal } from "@fischly-x/shared/src/types/calendar/day-boundaries";
import { SlotData } from "../../../components/week-grid/time-slot-event";

type EventColumn = {
    events: CalendarEventInternal[];
    lastEventTime: Temporal.ZonedDateTime;
}

/**
 * Given an array of EventColumns, returns the one which lastEventTime is the earliest
 */
const getEarliestColumn = (columns: EventColumn[]): EventColumn => {
    return columns.reduce((earliest, current) => {
        return current.lastEventTime.toString() < earliest.lastEventTime.toString()
            ? current
            : earliest;
    });
}


/**
 * Iterates over time slots and determines which events of the slot are visible and which
 * are collapsed in the slot. Assuming the events are already sorted by start time (and duration).
 * 
 * Collapsed events are marked as _isVisible = false.
 */
export const filterEvents = (
    events: CalendarEventInternal[],
    threshold: number,
    enableEventCutting: boolean = false
) => {
    // create event columns as many as the threshold value
    const eventColumns: EventColumn[] = [];
    for (let i = 0; i < threshold; i++) {
        eventColumns.push({
            events: [],
            lastEventTime: Temporal.ZonedDateTime.from('1970-01-01T00:00:00[UTC]')
        });
    }

    // sort the events by start time and duration
    const sortedEvents = [...events].sort(sortEventsByStartAndEnd);

    // iterate over the events and try to assign them to a event column if the column has space
    for (const event of sortedEvents) {
        const eventStart = event.start as Temporal.ZonedDateTime;
        const eventEnd = event.end as Temporal.ZonedDateTime;
        let assigned = false;

        // Try to find a column where this event can fit (no overlap with the last event)
        for (const column of eventColumns) {
            if (column.events.length === 0 || eventStart.toString() >= column.lastEventTime.toString()) {
                column.events.push(event);
                column.lastEventTime = event.end as Temporal.ZonedDateTime;
                event._isVisible = true;
                assigned = true;
                break;
            }
        }

        if (enableEventCutting) {
            if (!assigned) {
                const earliestColumn = getEarliestColumn(eventColumns);

                if (eventEnd.toString() > earliestColumn.lastEventTime.toString()) {
                    event.start = earliestColumn.lastEventTime;
                    event._start = earliestColumn.lastEventTime;

                    earliestColumn.events.push(event);
                    earliestColumn.lastEventTime = eventEnd;
                    event._isVisible = true;
                    assigned = true;
                }
            }
        }

        // if no column has space, mark the event as _isVisible = false
        if (!assigned) {
            event._isVisible = false;
        }
    }
}


export const generateSlotEvents = (
    date: Temporal.ZonedDateTime,
    dayBoundaries: DayBoundariesInternal,
    slotDurationMinutes: number,
    timezone: string,
    events: CalendarEventInternal[],
): SlotData[] => {
    const timeSlotEvents = [];
    const timeSlots = generateTimeslots(date.toPlainDate(), dayBoundaries.start, dayBoundaries.end, slotDurationMinutes, timezone);
    const timeSlotsWithEvents = assignEventsToTimeSlots(events, timeSlots);

    for (const timeSlot of timeSlotsWithEvents) {
        const collapsedEventCount = timeSlot.events.filter(event => !event._isVisible).length;

        if (collapsedEventCount > 0) {
            timeSlotEvents.push({
                id: timeSlot.id,
                collapsedEventCount: collapsedEventCount,
                start: timeSlot.start,
                end: timeSlot.end,
            });
        }
    }

    return timeSlotEvents;
}