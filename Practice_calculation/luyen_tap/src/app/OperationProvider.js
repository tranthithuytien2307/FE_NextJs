'use client'
import { useState } from 'react';
import { OperationContext } from './OperationContext';

export default function OperationProvider({children}){
    const [numberOfOperation, setNumberOfOperation] = useState(1);
    const [participations, setParticipations] = useState([
    { id: 1, math: 'Cộng', isChecked: false },
    { id: 2, math: 'Trừ', isChecked: false },
    { id: 3, math: 'Nhân', isChecked: false },
    { id: 4, math: 'Chia', isChecked: false },
    ]);

    const [startRange, setStartRange] = useState(0);
    const [endRange, setEndRange] = useState(9);
    const [minResult, setMinResult] = useState(0);
    const [maxResult, setMaxResult] = useState(100);

    return(
        <OperationContext.Provider value = {{numberOfOperation, setNumberOfOperation,
            participations, setParticipations,
            startRange, setStartRange,
            endRange, setEndRange,
            minResult, setMinResult,
            maxResult, setMaxResult
        }}>
            {children}
        </OperationContext.Provider>
    )
}