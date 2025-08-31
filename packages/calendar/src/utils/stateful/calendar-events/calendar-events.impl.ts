import CalendarEventExternal, {
  CalendarEventInternal,
} from '@fischly-x/shared/src/interfaces/calendar/calendar-event.interface'
import CalendarEvents, {
  EventsFilterPredicate,
} from '@fischly-x/shared/src/interfaces/calendar/calendar-events.interface'
import { signal } from '@preact/signals'
import CalendarConfigInternal from '@fischly-x/shared/src/interfaces/calendar/calendar-config'
import { externalEventToInternal } from '@fischly-x/shared/src/utils/stateless/calendar/external-event-to-internal'
import { BackgroundEvent } from '@fischly-x/shared/src/interfaces/calendar/background-event'

export const createCalendarEventsImpl = (
  events: CalendarEventExternal[],
  backgroundEvents: BackgroundEvent[],
  config: CalendarConfigInternal
): CalendarEvents => {
  const list = signal<CalendarEventInternal[]>(
    events.map((event) => {
      return externalEventToInternal(event, config)
    })
  )

  const filterPredicate = signal<EventsFilterPredicate | undefined>(undefined)

  return {
    list,
    filterPredicate,
    backgroundEvents: signal(backgroundEvents),
  }
}
