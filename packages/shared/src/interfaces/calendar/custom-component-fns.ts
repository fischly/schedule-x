import { CustomComponentFn } from './calendar-config'

export type CustomComponentName =
  | 'timeGridEvent'
  | 'timeSlotEvent'
  | 'dateGridEvent'
  | 'monthGridEvent'
  | 'monthAgendaEvent'
  | 'eventModal'
  | 'headerContentLeftPrepend'
  | 'headerContentLeftAppend'
  | 'headerContentRightPrepend'
  | 'headerContentRightAppend'
  | 'headerContent'
  | 'interactiveModalAdditionalFields'
  | 'weekGridDate'
  | 'weekGridHour'
  | 'monthGridDayName'
  | 'monthGridDate'
  | string

export type CustomComponentFns = {
  [key in CustomComponentName]?: CustomComponentFn
}
