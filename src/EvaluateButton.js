import react from "react";
import { ACTIONS } from "./App";

export default function EvaluateButton ({dispatch}) {
    return (
        <button className="span-two" onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button>
    )
}