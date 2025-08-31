import { datePickerLtLT } from './date-picker'
import { Language } from '@fischly-x/shared/src/types/translations/language.translations'
import { calendarLtLT } from './calendar'
import { timePickerLtLT } from './time-picker'

export const ltLT: Language = {
  ...datePickerLtLT,
  ...calendarLtLT,
  ...timePickerLtLT,
}
