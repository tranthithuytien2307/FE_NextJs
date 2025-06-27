'use client'
import { useContext } from "react";
import { OperationContext } from "@/app/OperationContext";

function RangeOfOperands(){
    const {startRange, setStartRange} = useContext(OperationContext)
    const {endRange, setEndRange} = useContext(OperationContext)
    return(
        <div className="flex flex-col gap-2 h-26">
            <p>Range của toán hạng</p>
            <div className="flex items-center border rounded-b-lg rounded-t-lg p-1 pl-3 pr-3 text-gray-400">
                <input type="number" className="w-42 border-none outline-none" value={startRange} onChange={(e) => {setStartRange(Number(e.target.value))}}></input>
                <span className="w-10 text-center">-</span>
                <input type="number" value={endRange} onChange={(e) => {setEndRange(Number(e.target.value))}} 
                className="pl-2 w-42 border-none outline-none"></input>
            </div>
            <p className="text-xs text-gray-400">Hai input: từ số minOperand đến maxOperand</p>
        </div>
    )
}
export default RangeOfOperands;