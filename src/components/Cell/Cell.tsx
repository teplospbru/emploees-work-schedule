import React, { FC, HTMLAttributes, MouseEvent, useEffect, useState } from 'react';
import './Cell.scss';
import { WorkShifts, WorkingShift } from '../../data/types';
import { getDuration, getMargins } from '../../data/api';
import dayjs from 'dayjs';

interface CellProps extends HTMLAttributes<HTMLDivElement> {
    workingShifts: WorkShifts;
    date: string;
    name: string;
}

export const Cell: FC<CellProps> = ({ workingShifts, date, name }) => {
    const [plan, setPlan] = useState<WorkingShift | null>(null);
    const [fact, setFact] = useState<WorkingShift | null>(null);
    const [role, setRole] = useState<string>('');
    // const [shown, setShown] = useState(false);

    // const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    //     event.stopPropagation();

    //     setShown(prev => !prev)
    // };

    useEffect(() => {
        const a = workingShifts.workingShifts.find(item => item.type === 'plan');

        if(a !== undefined) {
            setPlan(a);
            setRole(a.role);
        } else {
            setPlan(null);
        }

        const b = workingShifts.workingShifts.find(item => item.type === 'fact');

        if(b !== undefined) {
            setFact(b);
            setRole(b.role);
        } else {
            setFact(null);
        }
        
    }, [date, workingShifts]);

    // useEffect(() => {
    //     const handler = () => {
    //         setShown(false);
    //     }

    //     document.addEventListener('click', handler);

    //     return () => document.removeEventListener('click', handler);
    // }, [])
    
    
    return (
        <div className='cell'>
            { plan && <div className='cell__plan' style={getMargins(plan.from, plan.to)}></div> }
            { fact && <div className='cell__fact' style={getMargins(fact.from, fact.to)}></div> }

            <div className='cell__tooltip'>
                <h3>{dayjs(date).format('D MMMM YYYY')}</h3>
                <p>ФИО: {name}</p>
                <p>Должность: {role}</p>
                { plan && <p>Плановая длительность смены: {getDuration(plan.from, plan.to)}</p> }
                { fact && <p>Фактическая длительность смены: {getDuration(fact.from, fact.to)}</p> }
            </div>
        </div>
    )
}