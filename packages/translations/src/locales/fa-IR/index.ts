import { datePickerFaIR } from './date-picker'
import { Language } from '@fischly-x/shared/src/types/translations/language.translations'
import { calendarFaIR } from './calendar'
import { timePickerFaIR } from './time-picker'

export const faIR: Language = {
  ...datePickerFaIR,
  ...calendarFaIR,
  ...timePickerFaIR,
}
