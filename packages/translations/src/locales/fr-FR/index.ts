import { datePickerFrFR } from './date-picker'
import { Language } from '@fischly-x/shared/src/types/translations/language.translations'
import { calendarFrFR } from './calendar'
import { timePickerFrFR } from './time-picker'

export const frFR: Language = {
  ...datePickerFrFR,
  ...calendarFrFR,
  ...timePickerFrFR,
}
