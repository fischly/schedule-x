import { createContext } from 'preact'
import DatePickerAppSingleton from '@fischly-x/shared/src/interfaces/date-picker/date-picker-app.singleton'

export const AppContext = createContext<DatePickerAppSingleton>(
  {} as DatePickerAppSingleton
)
