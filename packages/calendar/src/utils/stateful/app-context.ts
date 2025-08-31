import { createContext } from 'preact'
import CalendarAppSingleton from '@fischly-x/shared/src/interfaces/calendar/calendar-app-singleton'

export const AppContext = createContext<CalendarAppSingleton>(
  {} as CalendarAppSingleton
)
