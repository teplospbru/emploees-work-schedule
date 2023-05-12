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
            <button className='mobile'>1 день</button>
            <button className='mobile'>2 дня</button>
            <button className='mobile tablet'>3 дня</button>
            <button className='mobile tablet'>4 дня</button>
          </div>
        </div>
      </nav>

      <div className='emploee-table'>
        <div className='sticky'>
          <div className='emploee-table__header'>
            <div></div>
            <div className='emploee-table__header-cell'>
              6 мая 2023 г
              <Segments />
            </div>
            <div className='emploee-table__header-cell mobile'>
              7 мая 2023 г
              <Segments />
            </div>
            <div className='emploee-table__header-cell mobile tablet'>
              8 мая 2023 г
              <Segments />
            </div>
            <div className='emploee-table__header-cell mobile tablet'>
              9 мая 2023 г
              <Segments />
            </div>
          </div>
        </div>

        <div className='emploee-table__body'>
          <div>Петров Ваня</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Иванов Петя</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Сидоров Андрей</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Бодров Кирилл</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Петров Ваня</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Иванов Петя</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Сидоров Андрей</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Бодров Кирилл</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>
          
          <div>Петров Ваня</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Иванов Петя</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Сидоров Андрей</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Бодров Кирилл</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>
          
          <div>Петров Ваня</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Иванов Петя</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Сидоров Андрей</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>

          <div>Бодров Кирилл</div>
          <div></div>
          <div className='mobile'></div>
          <div className='mobile tablet'></div>
          <div className='mobile tablet'></div>
          
        </div>
      </div>
    </div>
  );
};
