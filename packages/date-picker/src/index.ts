import { createDatePicker, createDatePickerInternal } from './factory'
import { DatePickerConfigExternal } from '@fischly-x/shared/src/interfaces/date-picker/config.interface'

export { createDatePicker, createDatePickerInternal }
export type DatePickerConfig = DatePickerConfigExternal

// For the Vue component
export interface IDatePickerConfig extends DatePickerConfig {}
