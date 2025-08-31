import { datePickerRuRU } from './date-picker'
import { Language } from '@fischly-x/shared/src/types/translations/language.translations'
import { calendarRuRU } from './calendar'
import { timePickerRuRU } from './time-picker'

export const ruRU: Language = {
  ...datePickerRuRU,
  ...calendarRuRU,
  ...timePickerRuRU,
}
