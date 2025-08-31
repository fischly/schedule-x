import { datePickerFiFI } from './date-picker'
import { Language } from '@fischly-x/shared/src/types/translations/language.translations'
import { calendarFiFI } from './calendar'
import { timePickerFiFI } from './time-picker'

export const fiFI: Language = {
  ...datePickerFiFI,
  ...calendarFiFI,
  ...timePickerFiFI,
}
