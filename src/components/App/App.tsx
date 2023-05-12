import React from 'react';
import '../../assets/svg/arrow-down.svg';
import '../../assets/svg/arrow-left.svg';
import '../../assets/svg/arrow-right.svg';
import './App.scss';

export const App = () => {
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
            <button>1 день</button>
            <button>2 дня</button>
            <button>3 дня</button>
            <button>4 дня</button>
          </div>
        </div>
      </nav>

      <div className='emploee-table'>
        <div className='emploee-table__header'>
          <div></div>
          <div className='emploee-table__header-cell'>
            6 мая 2023 г
            <Segments />
          </div>
          <div className='emploee-table__header-cell'>
            7 мая 2023 г
            <Segments />
          </div>
          <div className='emploee-table__header-cell'>
            8 мая 2023 г
            <Segments />
          </div>
          <div className='emploee-table__header-cell'>
            9 мая 2023 г
            <Segments />
          </div>
        </div>

        <div className='emploee-table__body'>
          <div>Петров Ваня</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>

          <div>Иванов Петя</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>

          <div>Сидоров Андрей</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>

          <div>Бодров Кирилл</div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
