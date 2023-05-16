import React, { FC, HTMLAttributes, useEffect, useState, memo } from 'react';
import './Cell.scss';
import { WorkShifts, WorkingShift } from '../../data/types';
import { getDuration, getMargins } from '../../data/api';
import dayjs from 'dayjs';

interface CellProps extends HTMLAttributes<HTMLDivElement> {
  workingShifts: WorkShifts;
  date: string;
  name: string;
}

const Cell: FC<CellProps> = ({ workingShifts, date, name }) => {
  const [plan, setPlan] = useState<WorkingShift | null>(null);
  const [fact, setFact] = useState<WorkingShift | null>(null);
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    const a = workingShifts.workingShifts.find((item) => item.type === 'plan');

    if (a !== undefined) {
      setPlan(a);
      setRole(a.role);
    } else {
      setPlan(null);
    }

    const b = workingShifts.workingShifts.find((item) => item.type === 'fact');

    if (b !== undefined) {
      setFact(b);
      setRole(b.role);
    } else {
      setFact(null);
    }
  }, [date, workingShifts]);

  return (
    <div className="cell">
      {plan && <div className="cell__plan" style={getMargins(plan.from, plan.to)}></div>}
      {fact && <div className="cell__fact" style={getMargins(fact.from, fact.to)}></div>}

      <div className="cell__tooltip">
        <h3>{dayjs(date).format('D MMMM YYYY')}</h3>
        <p>
          <b>ФИО:</b> {name}
        </p>
        <p>
          <b>Должность:</b> {role}
        </p>
        {plan && (
          <p>
            <b>Плановая длительность смены:</b> <span className="green">{getDuration(plan.fromUTC, plan.toUTC)}</span>
          </p>
        )}
        {fact && (
          <p>
            <b>Фактическая длительность смены:</b> <span className="pink">{getDuration(fact.fromUTC, fact.toUTC)}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(Cell);
