'use client'

import { useContext } from "react";
import { OperationContext } from "@/app/OperationContext";

function RangeOfResult() {
    const {minResult, setMinResult} = useContext(OperationContext);
    const {maxResult, setMaxResult} = useContext(OperationContext);
    return(
        <div className="flex flex-col mt-2 gap-2 h-26">
            <p>Range của kết quả hợp lệ</p>
            <div className="flex items-center border rounded-b-lg rounded-t-lg p-1 pl-3 pr-3 text-gray-400">
                <input type="number" className="w-42 border-none outline-none" value={minResult} onChange={(e) => {setMinResult(Number(e.target.value))}}></input>
                <span className="w-10 text-center">-</span>
                <input type="number" className="w-42 border-none outline-none" value={maxResult} onChange={(e) => {setMaxResult(Number(e.target.value))}}></input>
            </div>
            <p className="text-xs text-gray-400">Hai input: từ minResult đến maxResult</p>
        </div>
    )
}
export default RangeOfResult;