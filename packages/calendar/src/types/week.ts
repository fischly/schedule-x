import { CalendarEventInternal } from '@fischly-x/shared/src/interfaces/calendar/calendar-event.interface'
import { DATE_GRID_BLOCKER } from '../constants'
import { BackgroundEvent } from '@fischly-x/shared/src/interfaces/calendar/background-event'

type WeekDay = {
  date: string
  timeGridEvents: CalendarEventInternal[]
  dateGridEvents: {
    [key: string]: CalendarEventInternal | typeof DATE_GRID_BLOCKER | undefined
  }
  backgroundEvents: BackgroundEvent[]
}

export type Week = Record<string, WeekDay>
