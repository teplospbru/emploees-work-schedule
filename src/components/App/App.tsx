import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';
import { getExploees, getWorkingShifts } from '../../data/api';
import { EmploeesData, Response } from '../../data/types';
import dayjs from 'dayjs';
import '../../assets/svg/arrow-down.svg';
import '../../assets/svg/arrow-left.svg';
import '../../assets/svg/arrow-right.svg';
import './App.scss';
import Cell from '../Cell/Cell';
import Segments from '../Segments/Segments';

export const App = () => {
  const [period, setPeriod] = useState<number>(4); // период - кол-во дней просмотра в таблице
  const [firstColumnWidth, setFirstColumnWidth] = useState('300px'); // ширина первой колонки таблицы, чтобы поддержать адаптив
  const [data, setData] = useState<Response | null>(null); // все данные от api
  const [length, setLength] = useState<number | null>(null); // длина массива дат
  const [calendar, setCalendar] = useState<number>(1); // стейт выпадающего списка календаря
  const [shop, setShop] = useState(''); // стейт селекта магазина
  const [tableData, setTableData] = useState<EmploeesData | null>(null); // данные для таблицы (зависят от выбранного магазина)
  const [slider, setSlider] = useState<number>(1); // значение, подобное стейту календаря, нужно, чтобы даты в таблице не выхадили за диапазон календаря

  // Хэндлер селекта календаря
  const calendarClickHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    setCalendar(value);

    if (length && length !== null) {
      if (value < length - (period - 1)) {
        setSlider(value);
      } else {
        setSlider(length - (period - 1));
      }
    }
  };

  // мемоизация для хэндлера клика пострелке влево, чтобы пофиксить ненужные перерендеры
  const memoizedSlider = useCallback(() => {
    if(length && length !== null) {
      if (calendar < length - (period - 1)) {
        setSlider(calendar)
      } else {
        setSlider(length - (period - 1));
      }
    }
  }, [calendar])

  // Хэндлер клика пострелке влево
  const moveLeft = () => {
    if (length !== null) {
      if (calendar > 1) {
        setCalendar(calendar - 1);
      }
      if (slider > 1) {
        memoizedSlider()
      }
    }
  };

  // Хэндлер клика по стрелке вправо
  const moveRight = () => {
    if (length !== null) {
      if (calendar < length) {
        setCalendar((prev) => prev + 1);
      }
      if (slider < length - (period - 1)) {
        setSlider((prev) => prev + 1);
      }
    }
  };

  // устанвливаем перид и ширину первой колонки в зависимости от ширины окна при первом рендере
  useEffect(() => {
    const windowInnerWidth = window.innerWidth;

    if (windowInnerWidth >= 960) {
      setPeriod(4);
      setFirstColumnWidth('300px');
    } else if (windowInnerWidth < 650) {
      setPeriod(1);
      setFirstColumnWidth('200px');
    } else {
      setPeriod(2);
      setFirstColumnWidth('250px');
    }
  }, []);

  // тоже при ресайзе окна
  useEffect(() => {
    const windowInnerWidthHandler = () => {
      const windowInnerWidth = window.innerWidth;

      if (windowInnerWidth >= 960) {
        setPeriod(4);
        setFirstColumnWidth('300px');
      } else if (windowInnerWidth < 650) {
        setPeriod(1);
        setFirstColumnWidth('200px');
      } else {
        setPeriod(2);
        setFirstColumnWidth('250px');
      }
    };

    addEventListener('resize', windowInnerWidthHandler);
    return () => removeEventListener('resize', windowInnerWidthHandler);
  }, []);

  // Настройка свайпов
  const handlers = useSwipeable({
    onSwipedLeft: () => moveRight(),
    onSwipedRight: () => moveLeft(),
    delta: 10,
    preventScrollOnSwipe: false,
    trackTouch: true,
    trackMouse: true,
    rotationAngle: 0,
    swipeDuration: Infinity,
    touchEventOptions: { passive: true },
  });

  // здесь настраивается стейт данными от api после моунта компонента
  useEffect(() => {
    console.time()
    getExploees()
      .then((response) => {
        console.timeEnd()
        setData(response);
        const a = response.shopList[0];
        setShop(a);
        const b = response.emploeesData.find((item) => item.shop === a) as EmploeesData;
        setTableData(b);
        setLength(response.dateList.length);
      })
      .catch((response) => console.log(response));
  }, []);

  // здесь настраивается стейт таблицы в зависимости от выбранного магазина
  useEffect(() => {
    if (data !== null) {
      const b = data.emploeesData.find((item) => item.shop === shop) as EmploeesData;
      setTableData(b);
    }
  }, [shop, data]);

  // обновляем даты в таблице при переключении периода
  useEffect(() => {
    memoizedSlider()
  }, [period, memoizedSlider]);

  if (data === null) {
    return null;
  }
  // console.log(slider)
  return (
    <div className="container">
      <h1>График работы сотрудников</h1>
      <nav className="sort-panel">
        <div className="sort-panel__shop">
          Магазин
          <div>
            <select onChange={(event) => setShop(event.target.value)}>
              {data.shopList.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg className="sort-panel__arrow-down">
              <use xlinkHref="#arrow-down"></use>
            </svg>
          </div>
        </div>

        <div className="sort-panel__calendar">
          Отображать с
          <div className="sort-panel__calendar-date">
            <button onClick={moveLeft}>
              <svg className="sort-panel__arrow-left">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <div>
              <select value={calendar} onChange={(event) => calendarClickHandler(event)}>
                {data.dateList.map((option, index) => (
                  <option value={index + 1} key={option}>
                    {dayjs(option).format('DD MMMM YYYY')}
                  </option>
                ))}
              </select>
              <svg className="sort-panel__arrow-down">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </div>
            <button onClick={moveRight}>
              <svg className="sort-panel__arrow-right">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>
          <div className="sort-panel__calendar-period">
            <button className={classNames('mobile', { active: period === 1 })} onClick={() => setPeriod(1)}>
              1 день
            </button>
            <button className={classNames('mobile', { active: period === 2 })} onClick={() => setPeriod(2)}>
              2 дня
            </button>
            <button className={classNames('mobile tablet', { active: period === 3 })} onClick={() => setPeriod(3)}>
              3 дня
            </button>
            <button className={classNames('mobile tablet', { active: period === 4 })} onClick={() => setPeriod(4)}>
              4 дня
            </button>
          </div>
        </div>
      </nav>

      <div {...handlers} className="emploee-table">
        <div className="sticky">
          <div
            className="emploee-table__header"
            style={{ gridTemplateColumns: `${firstColumnWidth} repeat(${period}, 1fr)` }}
          >
            <div></div>
            <div className="emploee-table__header-cell">
              {dayjs(data.dateList[slider - 1]).format('D MMMM YYYY')}
              <Segments period={period} firstColumnWidth={firstColumnWidth} />
            </div>
            <div className={classNames('emploee-table__header-cell mobile', { disactive: period < 2 })}>
              {dayjs(data.dateList[slider]).format('D MMMM YYYY')}
              <Segments period={period} firstColumnWidth={firstColumnWidth} />
            </div>
            <div className={classNames('emploee-table__header-cell mobile tablet', { disactive: period < 3 })}>
              {dayjs(data.dateList[slider + 1]).format('D MMMM YYYY')}
              <Segments period={period} firstColumnWidth={firstColumnWidth} />
            </div>
            <div className={classNames('emploee-table__header-cell mobile tablet', { disactive: period < 4 })}>
              {dayjs(data.dateList[slider + 2]).format('D MMMM YYYY')}
              <Segments period={period} firstColumnWidth={firstColumnWidth} />
            </div>
          </div>
        </div>

        <div
          className="emploee-table__body"
          style={{ gridTemplateColumns: `${firstColumnWidth} repeat(${period}, 1fr)` }}
        >
          {tableData &&
            tableData.data.map((emploee) => (
              <>
                <div>{emploee.name}</div>
                <div>
                  <Cell
                    workingShifts={getWorkingShifts(tableData, emploee.name, data.dateList[slider - 1])}
                    date={data.dateList[slider - 1]}
                    name={emploee.name}
                  />
                </div>
                <div className={classNames('mobile', { disactive: period < 2 })}>
                  <Cell
                    workingShifts={getWorkingShifts(tableData, emploee.name, data.dateList[slider])}
                    date={data.dateList[slider]}
                    name={emploee.name}
                  />
                </div>
                <div className={classNames('mobile tablet', { disactive: period < 3 })}>
                  <Cell
                    workingShifts={getWorkingShifts(tableData, emploee.name, data.dateList[slider + 1])}
                    date={data.dateList[slider + 1]}
                    name={emploee.name}
                  />
                </div>
                <div className={classNames('mobile tablet', { disactive: period < 4 })}>
                  <Cell
                    workingShifts={getWorkingShifts(tableData, emploee.name, data.dateList[slider + 2])}
                    date={data.dateList[slider + 2]}
                    name={emploee.name}
                  />
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};
