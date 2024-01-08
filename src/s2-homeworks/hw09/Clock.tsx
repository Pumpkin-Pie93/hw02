import React, {MouseEventHandler, useEffect, useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'
import {hover} from "@testing-library/user-event/dist/hover";
import {Simulate} from "react-dom/test-utils";
import mouseOver = Simulate.mouseOver;


function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(true)

    useEffect(() => {
        setDate(new Date())
    }, []);

    const start = () => {
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        const timerId = setInterval(() => {
            setDate(new Date())
        }, 1000)
        setTimerId(Number(timerId))
        // return () => {
        //     clearInterval(timerId)
        // }
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)
    }
    const stop = () => {
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
        clearInterval(timerId)
        setTimerId(undefined)

    }

    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
        setShow(true)
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false)

    }
    const dateCorrector = (num: number) => {
        return (num < 10) ? '0' + num : num
    }
    const stringTime = `${dateCorrector(date.getHours())}:${dateCorrector(date.getMinutes())}: ${dateCorrector(date.getSeconds())}` ||
        <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    const stringDate = date.toLocaleDateString() ||
        <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    // const stringDay = date.getDay() ||  <br/> // пишут студенты 'date->day'
    type WeekType = {
        [key: number]: string
    }
    const weeks: WeekType = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday'
    }
    const MonthName:WeekType = {
        0:'January',
        1:'February ',
        2:'March ',
        3:'April ',
        4:'May ',
        5:'June ',
        6:'July ',
        7:'August ',
        8:'September ',
        9:'October ',
        10:'November ',
        11:'December '
    }
    const stringDay = weeks[date.getDay()] || <br/> // пишут студенты 'date->day'
    const stringMonth = MonthName[Number(date.getMonth())] || <br/> // пишут студенты 'date->month'

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId? true :false} // пишут студенты // задизэйблить если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!timerId? true :false} // пишут студенты // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
