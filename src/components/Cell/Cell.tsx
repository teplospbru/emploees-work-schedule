import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import './Cell.scss';
import { WorkShifts, WorkingShift } from '../../data/types';
import { getMargins } from '../../data/api';

interface CellProps extends HTMLAttributes<HTMLDivElement> {
    workingShifts: WorkShifts;
    date: string;
}

export const Cell: FC<CellProps> = ({ workingShifts, date }) => {
    const [plan, setPlan] = useState<WorkingShift | null>(null);
    const [fact, setFact] = useState<WorkingShift | null>(null);

    useEffect(() => {
        const a = workingShifts.workingShifts.find(item => item.type === 'plan');

        if(a !== undefined) {
            setPlan(a);
        } else {
            setPlan(null);
        }

        const b = workingShifts.workingShifts.find(item => item.type === 'fact');

        if(b !== undefined) {
            setFact(b);
        } else {
            setFact(null);
        }
        // console.log(a,b, date)
        
    }, [date, workingShifts]);
    
    
    return (
        <div className='cell'>
            { plan && <div className='cell__plan' style={getMargins(plan.from, plan.to)}></div> }
            { fact && <div className='cell__fact' style={getMargins(fact.from, fact.to)}></div> }
        </div>
    )
}