'use client'
import { useContext } from "react";
import { OperationContext } from "@/app/OperationContext";

function NumberOfOperation(){
    const {numberOfOperation, setNumberOfOperation} = useContext(OperationContext);
    return (
        <div className="flex flex-col mb-2 gap-2 h-26">
            <p>Số lượng phép toán</p>
            <div className="w-full flex justify-between items-center border rounded-b-lg rounded-t-lg p-1 pl-3 pr-3 text-gray-400">
                <button onClick={() => {setNumberOfOperation(numberOfOperation - 1)}}> - </button>
                <span>{ numberOfOperation }</span>
                <button onClick={() => {setNumberOfOperation(numberOfOperation + 1)}}> + </button>
            </div>
            <p className="text-xs text-gray-400">Ví dụ: 3 phép toán a + b + c + d</p>
        </div>
    )
}
export default NumberOfOperation;