import { datePickerDeDE } from './date-picker'
import { Language } from '@fischly-x/shared/src/types/translations/language.translations'
import { calendarDeDE } from './calendar'
import { timePickerDeDE } from './time-picker'

export const deDE: Language = {
  ...datePickerDeDE,
  ...calendarDeDE,
  ...timePickerDeDE,
}
