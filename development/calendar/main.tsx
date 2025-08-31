/* eslint-disable max-lines */
import 'temporal-polyfill/global'
import '@fontsource/open-sans'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500-italic.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/700-italic.css'
import '@fontsource/roboto-condensed'
import {
  createCalendar,
} from '@fischly-x/calendar/src'
import '../../packages/theme-default/src/calendar.scss'
import '../app.css'
import { createDragAndDropPlugin } from '@fischly-x/drag-and-drop/src'
import { createEventModalPlugin } from '@fischly-x/event-modal/src'
import { seededEvents } from '../data/seeded-events.ts'
import { createScrollControllerPlugin } from '@fischly-x/scroll-controller/src'
import { createResizePlugin } from '../../packages/resize/src'
import {
  createEventRecurrencePlugin,
  createEventsServicePlugin,
} from '@fischly-x/event-recurrence/src'
import { createCalendarControlsPlugin } from '../../packages/calendar-controls/src'
import { createViewMonthGrid } from '@fischly-x/calendar/src/views/month-grid'
import { createViewWeek } from '@fischly-x/calendar/src/views/week'
import { createViewDay } from '@fischly-x/calendar/src/views/day'
import { createViewMonthAgenda } from '@fischly-x/calendar/src/views/month-agenda'
import { createViewList } from '@fischly-x/calendar/src/views/list'
import { mergeLocales } from '@fischly-x/translations/src/utils/merge-locales.ts'
import { translations } from '@fischly-x/translations/src'
import { IANATimezone } from '@fischly-x/shared/src/utils/stateless/time/tzdb.ts'
import '../../packages/timezone-select/src/timezone-select.scss'

import { dateStringRegex } from '@fischly-x/shared/src'
import { createCurrentTimePlugin } from '../../packages/current-time/src'
import { createTimezoneSelectPlugin, translations as timezoneSelectTranslations } from '../../packages/timezone-select/src'
import { render } from 'preact'

const calendarElement = document.getElementById('calendar') as HTMLElement

const eventsServicePlugin = createEventsServicePlugin()
const calendarControlsPlugin = createCalendarControlsPlugin()
const scrollController = createScrollControllerPlugin({
  initialScroll: '01:00'
})

const customComponentFns = {
  timeSlotEvent: (element: HTMLElement, props: { slotEvent: SlotEvent }) => {
    console.log('timeSlotEvent', props)
  }
}



const calendar = createCalendar({
  plugins: [
    createEventRecurrencePlugin(),
    eventsServicePlugin,
    createDragAndDropPlugin(),
    createEventModalPlugin(),
    createResizePlugin(),
    calendarControlsPlugin,
    scrollController,
    createCurrentTimePlugin(),
    createTimezoneSelectPlugin(),
  ],

  translations: mergeLocales(
    translations,
    timezoneSelectTranslations
  ),

  showWeekNumbers: true,
  /* dayBoundaries: {
    start: '20:00',
    end: '06:00'
  }, */
  firstDayOfWeek: 1,
  views: [createViewMonthGrid(), createViewWeek(), createViewDay(), createViewMonthAgenda(), createViewList()],
  defaultView: 'week',
  // weekOptions: {
  //   eventGrouping: {
  //     enabled: true,
  //     slotDurationMinutes: 60,
  //     eventsThreshold: 2,
  //   }
  // },
  callbacks: {
    onScrollDayIntoView(date) {
      console.log('onScrollDayIntoView: ', date)
    },

    onEventUpdate(event) {
      console.log('onEventUpdate', event)
      console.log('event.start', event.start.toString())
      console.log('event.end', event.end.toString())
    },

    onEventClick(event, e) {
      console.log('onEventClick', event, e)
    },

    onDoubleClickEvent(event, e) {
      console.log('onDoubleClickEvent', event, e)
    },

    onClickDate(date) {
      console.log('onClickDate', date)
    },

    onClickDateTime(dateTime) {
      console.log('onClickDateTime', dateTime.toString())
    },

    onClickAgendaDate(date) {
      console.log('onClickAgendaDate', date.toString())
    },

    onDoubleClickAgendaDate(date) {
      console.log('onDoubleClickAgendaDate', date.toString())
    },

    onClickPlusEvents(date) {
      console.log('onClickPlusEvents', date.toString())
    },

    onSelectedDateUpdate(date) {
      console.log('onSelectedDateUpdate', date.toString())
    },

    onDoubleClickDateTime(dateTime) {
      console.log('onDoubleClickDateTime', dateTime.toString())
    },

    onDoubleClickDate(date) {
      console.log('onDoubleClickDate', date.toString())
    },

    onRangeUpdate(range) {
      console.log('onRangeUpdate', range.start.toString(), range.end.toString())
      /* console.log(range.start.toString())
      console.log(range.end.toString()) */
    },
  },
  // selectedDate: Temporal.PlainDate.from({ year: 2024, month: 2, day: 5 }),
  calendars: {
    personal: {
      colorName: 'personal',
      lightColors: {
        main: '#f9d71c',
        container: '#fff5aa',
        onContainer: '#594800',
      },
      darkColors: {
        main: '#fff5c0',
        onContainer: '#fff5de',
        container: '#a29742',
      },
    },
    work: {
      colorName: 'work',
      lightColors: {
        main: '#f91c45',
        container: '#ffd2dc',
        onContainer: '#59000d',
      },
      darkColors: {
        main: '#ffc0cc',
        onContainer: '#ffdee6',
        container: '#a24258',
      },
    },
    leisure: {
      colorName: 'leisure',
      lightColors: {
        main: '#1cf9b0',
        container: '#dafff0',
        onContainer: '#004d3d',
      },
      darkColors: {
        main: '#c0fff5',
        onContainer: '#e6fff5',
        container: '#42a297',
      },
    },
    school: {
      colorName: 'school',
      lightColors: {
        main: '#1c7df9',
        container: '#d2e7ff',
        onContainer: '#002859',
      },
      darkColors: {
        main: '#c0dfff',
        onContainer: '#dee6ff',
        container: '#426aa2',
      },
    },
  },
  minDate: Temporal.PlainDate.from('2023-08-01'),
  maxDate: Temporal.PlainDate.from('2028-08-01'),
  dayBoundaries: {
    start: '06:00',
    end: '22:00',
  },
  backgroundEvents: [
    {
      title: 'Out of office',
      start: Temporal.ZonedDateTime.from('2025-08-08T00:00:00.000+02:00[Europe/Berlin]'),
      end: Temporal.ZonedDateTime.from('2025-08-09T12:00:00.000+02:00[Europe/Berlin]'),
      style: {
        // create tilted 5px thick gray lines
        backgroundImage: 'repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
        opacity: 0.5,
      },
      // rrule: 'FREQ=WEEKLY',
      // exdate: ['20250714T000000', '20250728T000000']
    },

    // PlainDate
    {
      title: 'Out of office 2',
      start: Temporal.PlainDate.from('2025-07-09'),
      end: Temporal.PlainDate.from('2025-07-10'),
      style: {
        backgroundImage: 'repeating-linear-gradient(45deg, #e3a, #e3a 5px, transparent 5px, transparent 10px)',
        opacity: 0.5,
      },
    },
  ],
  locale: 'en-US',

  // tz new york
  timezone: 'Europe/London',
  events: [
    // August 25, 2025
    {
      id: 1,
      title: 'Coffee with John',
      start: Temporal.ZonedDateTime.from('2025-08-25T08:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T09:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 2,
      title: 'Team Meeting',
      start: Temporal.ZonedDateTime.from('2025-08-25T08:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T10:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 3,
      title: 'Project Planning',
      start: Temporal.ZonedDateTime.from('2025-08-25T09:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T11:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 4,
      title: 'Client Call',
      start: Temporal.ZonedDateTime.from('2025-08-25T10:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T11:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 5,
      title: 'Design Review',
      start: Temporal.ZonedDateTime.from('2025-08-25T11:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T12:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 6,
      title: 'Lunch Break',
      start: Temporal.ZonedDateTime.from('2025-08-25T12:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T13:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 7,
      title: 'Code Review',
      start: Temporal.ZonedDateTime.from('2025-08-25T13:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T15:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 8,
      title: 'Product Demo',
      start: Temporal.ZonedDateTime.from('2025-08-25T14:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T15:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 9,
      title: 'Sprint Retrospective',
      start: Temporal.ZonedDateTime.from('2025-08-25T15:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T16:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 10,
      title: 'Training Session',
      start: Temporal.ZonedDateTime.from('2025-08-25T16:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T17:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 11,
      title: 'Marketing Strategy',
      start: Temporal.ZonedDateTime.from('2025-08-25T16:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T18:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 12,
      title: 'Budget Review',
      start: Temporal.ZonedDateTime.from('2025-08-25T17:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T18:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 13,
      title: 'Documentation Update',
      start: Temporal.ZonedDateTime.from('2025-08-25T18:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T19:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 14,
      title: 'Weekly Report',
      start: Temporal.ZonedDateTime.from('2025-08-25T18:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T19:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 15,
      title: 'Task Planning',
      start: Temporal.ZonedDateTime.from('2025-08-25T19:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T20:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 16,
      title: 'Email Cleanup',
      start: Temporal.ZonedDateTime.from('2025-08-25T07:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T08:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 17,
      title: 'Security Check',
      start: Temporal.ZonedDateTime.from('2025-08-25T06:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T07:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 18,
      title: 'Morning Standup',
      start: Temporal.ZonedDateTime.from('2025-08-25T09:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T09:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 19,
      title: 'UX Research',
      start: Temporal.ZonedDateTime.from('2025-08-25T14:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T16:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 20,
      title: 'Server Maintenance',
      start: Temporal.ZonedDateTime.from('2025-08-25T20:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-25T22:00:00.000+02:00[Europe/Vienna]'),
    },

    // August 26, 2025
    {
      id: 21,
      title: 'Morning Sync',
      start: Temporal.ZonedDateTime.from('2025-08-26T08:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T08:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 22,
      title: 'Architecture Review',
      start: Temporal.ZonedDateTime.from('2025-08-26T08:15:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T10:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 23,
      title: 'Performance Testing',
      start: Temporal.ZonedDateTime.from('2025-08-26T09:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T11:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 24,
      title: 'API Integration',
      start: Temporal.ZonedDateTime.from('2025-08-26T10:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T12:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 25,
      title: 'Customer Feedback',
      start: Temporal.ZonedDateTime.from('2025-08-26T11:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T12:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 26,
      title: 'Database Optimization',
      start: Temporal.ZonedDateTime.from('2025-08-26T12:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T14:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 27,
      title: 'Feature Planning',
      start: Temporal.ZonedDateTime.from('2025-08-26T13:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T15:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 28,
      title: 'Quality Assurance',
      start: Temporal.ZonedDateTime.from('2025-08-26T14:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T16:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 29,
      title: 'User Interface Design',
      start: Temporal.ZonedDateTime.from('2025-08-26T15:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T17:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 30,
      title: 'Deployment Planning',
      start: Temporal.ZonedDateTime.from('2025-08-26T16:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T17:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 31,
      title: 'Team Building',
      start: Temporal.ZonedDateTime.from('2025-08-26T17:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T19:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 32,
      title: 'Knowledge Sharing',
      start: Temporal.ZonedDateTime.from('2025-08-26T18:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T19:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 33,
      title: 'Infrastructure Review',
      start: Temporal.ZonedDateTime.from('2025-08-26T07:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T08:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 34,
      title: 'Bug Triage',
      start: Temporal.ZonedDateTime.from('2025-08-26T06:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T08:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 35,
      title: 'Risk Assessment',
      start: Temporal.ZonedDateTime.from('2025-08-26T19:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T21:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 36,
      title: 'System Monitoring',
      start: Temporal.ZonedDateTime.from('2025-08-26T20:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T21:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 37,
      title: 'Release Notes',
      start: Temporal.ZonedDateTime.from('2025-08-26T12:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T13:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 38,
      title: 'Data Analysis',
      start: Temporal.ZonedDateTime.from('2025-08-26T09:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T10:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 39,
      title: 'Business Requirements',
      start: Temporal.ZonedDateTime.from('2025-08-26T14:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T15:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 40,
      title: 'Code Refactoring',
      start: Temporal.ZonedDateTime.from('2025-08-26T16:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-26T18:30:00.000+02:00[Europe/Vienna]'),
    },

    // August 27, 2025
    {
      id: 41,
      title: 'Daily Standup',
      start: Temporal.ZonedDateTime.from('2025-08-27T08:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T09:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 42,
      title: 'Requirements Gathering',
      start: Temporal.ZonedDateTime.from('2025-08-27T08:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T10:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 43,
      title: 'Technical Debt Review',
      start: Temporal.ZonedDateTime.from('2025-08-27T09:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T11:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 44,
      title: 'Stakeholder Meeting',
      start: Temporal.ZonedDateTime.from('2025-08-27T10:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T12:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 45,
      title: 'Integration Testing',
      start: Temporal.ZonedDateTime.from('2025-08-27T11:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T13:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 46,
      title: 'Vendor Discussion',
      start: Temporal.ZonedDateTime.from('2025-08-27T12:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T14:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 47,
      title: 'Security Audit',
      start: Temporal.ZonedDateTime.from('2025-08-27T13:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T15:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 48,
      title: 'Mobile Testing',
      start: Temporal.ZonedDateTime.from('2025-08-27T14:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T16:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 49,
      title: 'Content Strategy',
      start: Temporal.ZonedDateTime.from('2025-08-27T15:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T17:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 50,
      title: 'Analytics Review',
      start: Temporal.ZonedDateTime.from('2025-08-27T16:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T17:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 51,
      title: 'User Experience Testing',
      start: Temporal.ZonedDateTime.from('2025-08-27T16:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T18:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 52,
      title: 'Performance Metrics',
      start: Temporal.ZonedDateTime.from('2025-08-27T17:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T19:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 53,
      title: 'Compliance Check',
      start: Temporal.ZonedDateTime.from('2025-08-27T18:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T19:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 54,
      title: 'Backup Verification',
      start: Temporal.ZonedDateTime.from('2025-08-27T07:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T08:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 55,
      title: 'System Update',
      start: Temporal.ZonedDateTime.from('2025-08-27T06:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T08:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 56,
      title: 'Accessibility Testing',
      start: Temporal.ZonedDateTime.from('2025-08-27T19:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T20:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 57,
      title: 'Load Testing',
      start: Temporal.ZonedDateTime.from('2025-08-27T20:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T22:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 58,
      title: 'Documentation Review',
      start: Temporal.ZonedDateTime.from('2025-08-27T12:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T13:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 59,
      title: 'Sprint Planning',
      start: Temporal.ZonedDateTime.from('2025-08-27T09:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T10:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 60,
      title: 'Error Log Analysis',
      start: Temporal.ZonedDateTime.from('2025-08-27T14:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-27T16:30:00.000+02:00[Europe/Vienna]'),
    },

    // August 28, 2025
    {
      id: 61,
      title: 'Morning Briefing',
      start: Temporal.ZonedDateTime.from('2025-08-28T08:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T08:45:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 62,
      title: 'Workshop Preparation',
      start: Temporal.ZonedDateTime.from('2025-08-28T08:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T10:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 63,
      title: 'Technology Workshop',
      start: Temporal.ZonedDateTime.from('2025-08-28T09:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T12:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 64,
      title: 'Lunch and Learn',
      start: Temporal.ZonedDateTime.from('2025-08-28T12:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T13:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 65,
      title: 'Client Presentation',
      start: Temporal.ZonedDateTime.from('2025-08-28T11:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T13:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 66,
      title: 'Team Retrospective',
      start: Temporal.ZonedDateTime.from('2025-08-28T13:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T14:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 67,
      title: 'Feature Demo',
      start: Temporal.ZonedDateTime.from('2025-08-28T14:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T15:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 68,
      title: 'Bug Fixing Session',
      start: Temporal.ZonedDateTime.from('2025-08-28T15:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T17:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 69,
      title: 'Code Deployment',
      start: Temporal.ZonedDateTime.from('2025-08-28T16:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T18:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 70,
      title: 'Post-deployment Testing',
      start: Temporal.ZonedDateTime.from('2025-08-28T17:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T19:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 71,
      title: 'Status Update Meeting',
      start: Temporal.ZonedDateTime.from('2025-08-28T18:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T19:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 72,
      title: 'Evening Sync',
      start: Temporal.ZonedDateTime.from('2025-08-28T19:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T19:45:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 73,
      title: 'Database Backup',
      start: Temporal.ZonedDateTime.from('2025-08-28T07:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T08:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 74,
      title: 'Server Health Check',
      start: Temporal.ZonedDateTime.from('2025-08-28T06:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T07:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 75,
      title: 'Night Monitoring',
      start: Temporal.ZonedDateTime.from('2025-08-28T20:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T22:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 76,
      title: 'Log File Analysis',
      start: Temporal.ZonedDateTime.from('2025-08-28T21:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T22:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 77,
      title: 'API Documentation',
      start: Temporal.ZonedDateTime.from('2025-08-28T10:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T12:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 78,
      title: 'User Story Review',
      start: Temporal.ZonedDateTime.from('2025-08-28T13:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T14:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 79,
      title: 'Cross-team Collaboration',
      start: Temporal.ZonedDateTime.from('2025-08-28T14:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T16:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 80,
      title: 'Infrastructure Planning',
      start: Temporal.ZonedDateTime.from('2025-08-28T16:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-28T18:30:00.000+02:00[Europe/Vienna]'),
    },

    // August 29, 2025
    {
      id: 81,
      title: 'Coffee with John',
      start: Temporal.ZonedDateTime.from('2025-08-29T08:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T09:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 82,
      title: 'All Hands Meeting',
      start: Temporal.ZonedDateTime.from('2025-08-29T08:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T10:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 83,
      title: 'Product Strategy',
      start: Temporal.ZonedDateTime.from('2025-08-29T09:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T11:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 84,
      title: 'Engineering Review',
      start: Temporal.ZonedDateTime.from('2025-08-29T10:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T12:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 85,
      title: 'Customer Interview',
      start: Temporal.ZonedDateTime.from('2025-08-29T11:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T12:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 86,
      title: 'Marketing Campaign',
      start: Temporal.ZonedDateTime.from('2025-08-29T12:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T14:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 87,
      title: 'Sales Training',
      start: Temporal.ZonedDateTime.from('2025-08-29T13:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T15:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 88,
      title: 'Financial Review',
      start: Temporal.ZonedDateTime.from('2025-08-29T14:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T16:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 89,
      title: 'HR Discussion',
      start: Temporal.ZonedDateTime.from('2025-08-29T15:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T16:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 90,
      title: 'Legal Consultation',
      start: Temporal.ZonedDateTime.from('2025-08-29T16:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T17:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 91,
      title: 'Partnership Meeting',
      start: Temporal.ZonedDateTime.from('2025-08-29T17:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T18:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 92,
      title: 'Board Preparation',
      start: Temporal.ZonedDateTime.from('2025-08-29T18:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T19:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 93,
      title: 'Early Bird Sync',
      start: Temporal.ZonedDateTime.from('2025-08-29T07:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T08:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 94,
      title: 'Pre-meeting Setup',
      start: Temporal.ZonedDateTime.from('2025-08-29T06:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T08:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 95,
      title: 'Late Evening Call',
      start: Temporal.ZonedDateTime.from('2025-08-29T19:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T21:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 96,
      title: 'System Maintenance',
      start: Temporal.ZonedDateTime.from('2025-08-29T20:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T22:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 97,
      title: 'Quarterly Planning',
      start: Temporal.ZonedDateTime.from('2025-08-29T12:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T14:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 98,
      title: 'Innovation Workshop',
      start: Temporal.ZonedDateTime.from('2025-08-29T09:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T11:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 99,
      title: 'Competitive Analysis',
      start: Temporal.ZonedDateTime.from('2025-08-29T14:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T16:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 100,
      title: 'Technology Roadmap',
      start: Temporal.ZonedDateTime.from('2025-08-29T16:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-29T18:30:00.000+02:00[Europe/Vienna]'),
    },

    // August 30, 2025
    {
      id: 101,
      title: 'Weekend Planning',
      start: Temporal.ZonedDateTime.from('2025-08-30T08:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T09:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 102,
      title: 'Team Hackathon',
      start: Temporal.ZonedDateTime.from('2025-08-30T08:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T18:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 103,
      title: 'Innovation Day',
      start: Temporal.ZonedDateTime.from('2025-08-30T09:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T17:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 104,
      title: 'Prototype Demo',
      start: Temporal.ZonedDateTime.from('2025-08-30T10:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T11:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 105,
      title: 'Creative Session',
      start: Temporal.ZonedDateTime.from('2025-08-30T11:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T13:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 106,
      title: 'Pizza Lunch',
      start: Temporal.ZonedDateTime.from('2025-08-30T12:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T13:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 107,
      title: 'Project Showcase',
      start: Temporal.ZonedDateTime.from('2025-08-30T13:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T15:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 108,
      title: 'Judging Panel',
      start: Temporal.ZonedDateTime.from('2025-08-30T14:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T16:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 109,
      title: 'Awards Ceremony',
      start: Temporal.ZonedDateTime.from('2025-08-30T15:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T17:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 110,
      title: 'Networking Session',
      start: Temporal.ZonedDateTime.from('2025-08-30T16:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T18:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 111,
      title: 'Happy Hour',
      start: Temporal.ZonedDateTime.from('2025-08-30T17:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T19:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 112,
      title: 'Team Dinner',
      start: Temporal.ZonedDateTime.from('2025-08-30T18:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T21:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 113,
      title: 'Setup Activities',
      start: Temporal.ZonedDateTime.from('2025-08-30T07:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T09:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 114,
      title: 'Equipment Check',
      start: Temporal.ZonedDateTime.from('2025-08-30T06:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T08:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 115,
      title: 'Clean Up',
      start: Temporal.ZonedDateTime.from('2025-08-30T19:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T20:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 116,
      title: 'After Party Planning',
      start: Temporal.ZonedDateTime.from('2025-08-30T20:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T21:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 117,
      title: 'Brainstorming Session',
      start: Temporal.ZonedDateTime.from('2025-08-30T10:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T12:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 118,
      title: 'Technical Review',
      start: Temporal.ZonedDateTime.from('2025-08-30T12:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T14:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 119,
      title: 'Feedback Collection',
      start: Temporal.ZonedDateTime.from('2025-08-30T14:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T16:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 120,
      title: 'Future Planning',
      start: Temporal.ZonedDateTime.from('2025-08-30T16:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-30T18:30:00.000+02:00[Europe/Vienna]'),
    },

    // August 31, 2025
    {
      id: 121,
      title: 'Month End Review',
      start: Temporal.ZonedDateTime.from('2025-08-31T08:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T10:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 122,
      title: 'Financial Closing',
      start: Temporal.ZonedDateTime.from('2025-08-31T08:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T11:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 123,
      title: 'Report Generation',
      start: Temporal.ZonedDateTime.from('2025-08-31T09:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T12:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 124,
      title: 'Performance Analytics',
      start: Temporal.ZonedDateTime.from('2025-08-31T10:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T12:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 125,
      title: 'Team Performance Review',
      start: Temporal.ZonedDateTime.from('2025-08-31T11:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T13:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 126,
      title: 'September Planning',
      start: Temporal.ZonedDateTime.from('2025-08-31T12:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T14:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 127,
      title: 'Goal Setting Workshop',
      start: Temporal.ZonedDateTime.from('2025-08-31T13:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T15:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 128,
      title: 'Process Improvement',
      start: Temporal.ZonedDateTime.from('2025-08-31T14:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T16:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 129,
      title: 'Knowledge Transfer',
      start: Temporal.ZonedDateTime.from('2025-08-31T15:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T17:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 130,
      title: 'Resource Allocation',
      start: Temporal.ZonedDateTime.from('2025-08-31T16:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T17:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 131,
      title: 'Final Wrap-up',
      start: Temporal.ZonedDateTime.from('2025-08-31T17:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T18:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 132,
      title: 'Archive Activities',
      start: Temporal.ZonedDateTime.from('2025-08-31T18:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T19:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 133,
      title: 'Early Morning Setup',
      start: Temporal.ZonedDateTime.from('2025-08-31T07:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T08:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 134,
      title: 'System Backup',
      start: Temporal.ZonedDateTime.from('2025-08-31T06:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T08:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 135,
      title: 'End of Month Celebration',
      start: Temporal.ZonedDateTime.from('2025-08-31T19:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T21:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 136,
      title: 'Night Shift Handover',
      start: Temporal.ZonedDateTime.from('2025-08-31T20:00:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T22:00:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 137,
      title: 'Data Reconciliation',
      start: Temporal.ZonedDateTime.from('2025-08-31T10:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T12:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 138,
      title: 'Compliance Audit',
      start: Temporal.ZonedDateTime.from('2025-08-31T12:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T14:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 139,
      title: 'Stakeholder Report',
      start: Temporal.ZonedDateTime.from('2025-08-31T14:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T16:30:00.000+02:00[Europe/Vienna]'),
    },
    {
      id: 140,
      title: 'Future Roadmap',
      start: Temporal.ZonedDateTime.from('2025-08-31T16:30:00.000+02:00[Europe/Vienna]'),
      end: Temporal.ZonedDateTime.from('2025-08-31T18:30:00.000+02:00[Europe/Vienna]'),
    },
  ],
  weekOptions: {
    eventGrouping: {
      enabled: true,
      slotDurationMinutes: 120,
      threshold: 2,
      enableEventCutting: true,
    },
    // eventWidth: 90,
  }
})
calendar._setCustomComponentFn('timeSlotEvent', (ele, props) => {
  const s = <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
    <div style={{
      color: 'black',
      border: '1px solid #aa0000',
      background: 'rgba(255, 0, 0, 0.5)',
      writingMode: 'vertical-rl',
    }}>+ {props.slotData.collapsedEventCount} weitere</div>
  </div>;
  render(s, ele);
});

calendar._setCustomComponentFn('timeGridEvent', (ele, props) => {
  const s = <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
    <div style={{
    }}>{ props.calendarEvent._realStart?.toString()  }</div>
    {console.log(props.calendarEvent)}
  </div>;
  render(s, ele);
});

calendar.render(calendarElement)

// change timezone via calendarControlsPlugin
const timezoneSelect = document.getElementById('timezone-select') as HTMLSelectElement
timezoneSelect.addEventListener('change', (e) => {
  const newTimezone = (e.target as HTMLSelectElement).value
  if (newTimezone) {
    calendarControlsPlugin.setTimezone(newTimezone as IANATimezone)
  }
})

const doStuffButton = document.getElementById('do-stuff') as HTMLButtonElement
doStuffButton.addEventListener('click', (e) => {
  scrollController.scrollTo('05:00')
})

const eventGroupingCheckbox = document.getElementById('event-grouping') as HTMLInputElement
eventGroupingCheckbox.addEventListener('change', (e) => {
  calendarControlsPlugin.setEventGroupingEnabled(eventGroupingCheckbox.checked)
})