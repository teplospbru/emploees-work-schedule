import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import '../../assets/svg/arrow-down.svg';
import '../../assets/svg/arrow-left.svg';
import '../../assets/svg/arrow-right.svg';
import './App.scss';

const arr = ['Петров Ваня', 'Иванов Петя', 'Сидоров Андрей', 'Бодров Кирилл', 'Петров Ваня', 'Иванов Петя', 'Сидоров Андрей', 'Бодров Кирилл', 
'Петров Ваня', 'Иванов Петя', 'Сидоров Андрей', 'Бодров Кирилл', 'Петров Ваня', 'Иванов Петя', 'Сидоров Андрей', 'Бодров Кирилл', 
'Петров Ваня', 'Иванов Петя', 'Сидоров Андрей', 'Бодров Кирилл', 'Петров Ваня', 'Иванов Петя', 'Сидоров Андрей', 'Бодров Кирилл',];

export const App = () => {
  const [period, setPeriod] = useState<number>(4); // период - кол-во дней просмотра 
  const [firstColumnWidth, setFirstColumnWidth] = useState('300px'); // ширина первой колонки таблицы, чтобы поддержать адаптив

  // Компонент отрисует шкалу времени
  const Segments = () => (
    <div className='emploee-table__header-cell-hours-segments'>
      <div></div>
      <div></div>
      <div><div>9:00</div></div>
      <div></div>
      <div></div>
      <div><div>18:00</div></div>
      <div></div>
    </div>
  )

  // устанвливаем перид и ширину первой колонки в зависимости от ширины окна
  useEffect(() => {
    const windowInnerWidth = window.innerWidth

    if(windowInnerWidth >= 960) {
      setPeriod(4);
      setFirstColumnWidth('300px');
    } else if(windowInnerWidth < 650) {
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
      const windowInnerWidth = window.innerWidth

      if(windowInnerWidth >= 960) {
        setPeriod(4);
        setFirstColumnWidth('300px');
      } else if(windowInnerWidth < 650) {
        setPeriod(1);
        setFirstColumnWidth('200px');
      } else {
        setPeriod(2);
        setFirstColumnWidth('250px');
      }
    }

    addEventListener('resize', windowInnerWidthHandler);
    return () => removeEventListener('resize', windowInnerWidthHandler);
  }, []);

  return (
    <div className='container'>
      <h1>График работы сотрудников</h1>
      <nav className='sort-panel'>
        <div className='sort-panel__shop'>
          Магазин
          <div>
            <select onClick={(event) => console.log(event)}>
              <option>магазин 1</option>
              <option>магазин 2</option>
            </select>
            <svg className='sort-panel__arrow-down'>
              <use xlinkHref='#arrow-down'></use>
            </svg>
          </div>
        </div>

        <div className='sort-panel__calendar'>
          Отображать с
          <div className='sort-panel__calendar-date'>
            <button>
              <svg className='sort-panel__arrow-left'>
                <use xlinkHref='#arrow-left'></use>
              </svg>
            </button>
            <div>
              <select onClick={(event) => console.log(event)}>
                <option>6 мая 2023 г</option>
                <option>7 мая 2023 г</option>
              </select>
              <svg className='sort-panel__arrow-down'>
                <use xlinkHref='#arrow-down'></use>
              </svg>
            </div>
            <button>
              <svg className='sort-panel__arrow-right'>
                <use xlinkHref='#arrow-right'></use>
              </svg>
            </button>
          </div>
          <div className='sort-panel__calendar-period'>
            <button 
              className={classNames('mobile', {'active': period === 1})} 
              onClick={() => setPeriod(1)}
            >1 день</button>
            <button 
              className={classNames('mobile', {'active': period === 2})} 
              onClick={() => setPeriod(2)}
            >2 дня</button>
            <button 
              className={classNames('mobile tablet', {'active': period === 3})}
              onClick={() => setPeriod(3)}
            >3 дня</button>
            <button 
              className={classNames('mobile tablet', {'active': period === 4})}
              onClick={() => setPeriod(4)}
            >4 дня</button>
          </div>
        </div>
      </nav>

      <div className='emploee-table'>
        <div className='sticky'>
          <div className='emploee-table__header' style={{ gridTemplateColumns: `${firstColumnWidth} repeat(${period}, 1fr)` }}>
            <div></div>
            <div className='emploee-table__header-cell'>
              6 мая 2023 г
              <Segments />
            </div>
            <div className={classNames('emploee-table__header-cell mobile', {'disactive': period < 2})}>
              7 мая 2023 г
              <Segments />
            </div>
            <div className={classNames('emploee-table__header-cell mobile tablet', {'disactive': period < 3})}>
              8 мая 2023 г
              <Segments />
            </div>
            <div className={classNames('emploee-table__header-cell mobile tablet', {'disactive': period < 4})}>
              9 мая 2023 г
              <Segments />
            </div>
          </div>
        </div>

        <div className='emploee-table__body' style={{ gridTemplateColumns: `${firstColumnWidth} repeat(${period}, 1fr)` }}>
          {arr.map((emploee) => (
            <>
              <div>{emploee}</div>
              <div></div>
              <div className={classNames('mobile', {'disactive': period < 2})}></div>
              <div className={classNames('mobile tablet', {'disactive': period < 3})}></div>
              <div className={classNames('mobile tablet', {'disactive': period < 4})}></div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
