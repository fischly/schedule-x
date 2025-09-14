import { getEventHeight } from '../../utils/stateless/events/event-styles'
import { useContext, useEffect, useRef } from 'preact/hooks'
import { AppContext } from '../../utils/stateful/app-context'
import { DayBoundariesDateTime } from '@fischly-x/shared/src/types/day-boundaries-date-time'
import { Fragment } from 'preact'
import { getCCID } from './time-grid-event-utils'
import { getElementByCCID } from '../../utils/stateless/dom/getters'
import { getYCoordinateInTimeGrid } from '@fischly-x/shared/src/utils/stateless/calendar/get-y-coordinate-in-time-grid'
import { InternalViewName } from '@fischly-x/shared/src/enums/calendar/internal-view.enum'

export type SlotData = {
    id: string
    collapsedEventCount: number
    start: Temporal.ZonedDateTime
    end: Temporal.ZonedDateTime
}


type props = {
    slotData: SlotData
    dayBoundariesDateTime: DayBoundariesDateTime
}

export default function TimeSlotEvent({
    slotData,
    dayBoundariesDateTime,
}: props) {
    const $app = useContext(AppContext)
    const eventRef = useRef<HTMLDivElement>(null)


    const customComponent = $app.config._customComponentFns.timeSlotEvent
    const customComponentId = getCCID(customComponent, false)

    useEffect(() => {
        if (!customComponent) return

        customComponent(getElementByCCID(customComponentId), {
            slotData: slotData,
        })
    }, [slotData])


    const changeViewToDay = () => {
        if (
            !$app.config.views.value.find(
                (view) => view.name === InternalViewName.Day
            )
        )
            return

        // Timeout to display the ripple effect
        setTimeout(() => {
            $app.calendarState.setIsEventGroupingEnabled(false)
            $app.datePickerState.selectedDate.value = slotData.start.toPlainDate()
            $app.calendarState.setView(InternalViewName.Day, slotData.start.toPlainDate())
        }, 250)
    }

    const handleOnClick = (e: MouseEvent) => {
        e.stopPropagation()
        changeViewToDay()
    }

    const handleOnDoubleClick = (e: MouseEvent) => {
        e.stopPropagation()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation()
            changeViewToDay()
        }
    }

    const classNames = ['sx__time-grid-event', 'sx__event', 'sx__time-slot-event']

    const realStartIsBeforeDayBoundaryStart =
        dayBoundariesDateTime &&
        slotData.start.toString() < dayBoundariesDateTime.start.toString() &&
        slotData.end.toString() >= dayBoundariesDateTime.start.toString()

    const relativeStartWithinDayBoundary = realStartIsBeforeDayBoundaryStart
        ? dayBoundariesDateTime?.start
        : (slotData.start as Temporal.ZonedDateTime)

    return (
        <>
            <div
                ref={eventRef}
                data-event-id={slotData.id}
                className={classNames.join(' ')}
                tabIndex={0}
                role="button"
                style={{
                    top: `${getYCoordinateInTimeGrid(
                        relativeStartWithinDayBoundary,
                        $app.config.dayBoundaries.value,
                        $app.config.timePointsPerDay
                    )}%`,
                    height: `${getEventHeight(
                        relativeStartWithinDayBoundary,
                        slotData.end as Temporal.ZonedDateTime,
                        $app.config.dayBoundaries.value,
                        $app.config.timePointsPerDay
                    )}%`,
                    width: `${$app.config.weekOptions.value.eventGrouping?.showMoreWidth || 10}%`,
                    insetInlineStart: `${100 - ($app.config.weekOptions.value.eventGrouping?.showMoreWidth || 10)}%`,
                    padding: '0',
                }}
            >
                <div
                    data-ccid={customComponentId}
                    className="sx__time-grid-event-inner"
                >
                    {!customComponent && (
                        <Fragment>
                            {/* Compact layout - title and time inline */}
                            {(
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    height: '100%',
                                }}>
                                    <div className="sx__time-grid-event-title"
                                        onClick={handleOnClick}
                                        onDblClick={handleOnDoubleClick}
                                        onKeyDown={handleKeyDown}
                                        style={{
                                            textAlign: 'center',
                                            writingMode: 'vertical-rl',
                                            height: '100%',
                                            background: 'rgba(190, 190, 190, 0.54)',
                                            cursor: 'pointer',
                                        }} >
                                        +{slotData.collapsedEventCount} more
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    )}

                </div>
            </div>
        </>
    )
}
