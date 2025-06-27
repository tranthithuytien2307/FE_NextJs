'use client'
import input from "daisyui/components/input";
import label from "daisyui/components/label";
import { useContext } from "react";
import { OperationContext } from "@/app/OperationContext";

function ParticipationOperations(){
    const {participations, setParticipations} = useContext(OperationContext);

    const toggleCheckbox = (id) => {
        setParticipations(prev =>
            prev.map(item =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    };

    return(
        <div className="flex flex-col gap-2 h-18">
            <p>Phép toán tham gia</p>
            <div className="flex justify-evenly">
                {participations.map((par) => (
                    <label key ={par.id} className="flex items-center gap-1">
                        <input type="checkbox" checked = {par.isChecked} onChange={() => toggleCheckbox(par.id)} />
                        <span>{par.math}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}
export default ParticipationOperations;