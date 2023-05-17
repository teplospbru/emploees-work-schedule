import React, { FC, HTMLAttributes, memo, useEffect, useState } from 'react';
import './Segments.scss';

interface SegmentsProps extends HTMLAttributes<HTMLDivElement> {
    period: number;
    firstColumnWidth: string;
}

// Компонент отрисует шкалу времени
const Segments: FC<SegmentsProps> = ({ period, firstColumnWidth }) => {
    const [ variant, setVariant ] = useState<number>(0); // вариант отображения сегментов

    useEffect(() => {
        if(period === 1 && firstColumnWidth === '300px') {
            setVariant(1);
        } else {
            setVariant(0);
        }
    }, [period, firstColumnWidth])

    return (
        <div 
            className="emploee-table__header-cell-hours-segments" 
            style={variant === 1 ? { padding: '0 4.15%' } : undefined}
        >
            {variant === 1 && <div></div>}
            {variant === 1 && <div></div>}
            <div>{variant === 1 && <div>3:00</div>}</div>
            {variant === 1 && <div></div>}
            {variant === 1 && <div></div>}
            <div>{variant === 1 && <div>6:00</div>}</div>
            {variant === 1 && <div></div>}
            {variant === 1 && <div></div>}
            <div><div>9:00</div></div>
            {variant === 1 && <div></div>}
            {variant === 1 && <div></div>}
            <div>{variant === 1 && <div>12:00</div>}</div>
            {variant === 1 && <div></div>}
            {variant === 1 && <div></div>}
            <div>{variant === 1 && <div>15:00</div>}</div>
            {variant === 1 && <div></div>}
            {variant === 1 && <div></div>}
            <div><div>18:00</div></div>
            {variant === 1 && <div></div>}
            {variant === 1 && <div></div>}
            <div>{variant === 1 && <div>21:00</div>}</div>
            {variant === 1 && <div></div>}
            {variant === 1 && <div></div>}
        </div>
    )
}

export default memo(Segments);