import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import ClearButton from "./ClearButton";
import DeleteButton from "./DeleteButton";
import EvaluateButton from "./EvaluateButton";
import "./styles.css"


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function evaluate({ previousOperand, currentOperand, operation }) {
  switch (operation) {
    case "÷":
      return `${String((Number(previousOperand) / Number(currentOperand)))}`
    case "*":
      return `${String((Number(previousOperand) * Number(currentOperand)))}`
    case "+":
      return `${String((Number(previousOperand) + Number(currentOperand)))}`
    case "-":
      return `${String((Number(previousOperand) - Number(currentOperand)))}`
  }

}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "." && !state.currentOperand) {
        return {
          ...state,
          currentOperand: null
        }
      } else if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      } else if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      } else if (payload.digit !== "0" && payload.digit !== "." && state.currentOperand === "0") {
        return {
          ...state,
          currentOperand: `${payload.digit}`
        }
      } else {
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`
        }
      }

    case ACTIONS.CHOOSE_OPERATION:

      if (state.currentOperand && !state.operation) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: null
        }
      } else if (state.operation) {
        if (state.operation !== payload.operation && !state.currentOperand) {
          return {
            ...state,
            operation: payload.operation
          }
        } else if (state.operation !== payload.operation && state.currentOperand) {
          return {
            ...state,
            currentOperand: null,
            previousOperand: evaluate(state),
            operation: payload.operation
          }
        } else {
          return {
            ...state,
            currentOperand: null,
            previousOperand: evaluate(state),
            operation: state.operation
          }
        }
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DELETE_DIGIT:
      if (!state.currentOperand) {
        return state
      } else {
        return {
          ...state,
          currentOperand: `${state.currentOperand.substring(0, state.currentOperand.length - 1)}`
        }
      }

    case ACTIONS.EVALUATE:
      if (!state.currentOperand || !state.operation || !state.previousOperand) {
        return state
      } else {
        return {
          ...state,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state)
        }
      }
  }
}


const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", { maximumFractionDigits: 0 })

function formatOperand(operand) {
  if (operand == null) return

  const [integer, decimal] = operand.split(".")
  if (decimal == null) {
    return `${INTEGER_FORMATTER.format(integer)}`
  } else {
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }

}


function App() {

  const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <ClearButton dispatch={dispatch} />
      <DeleteButton dispatch={dispatch} />
      <OperationButton dispatch={dispatch} operation="÷" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="*" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="-" />
      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      <EvaluateButton dispatch={dispatch} />
    </div>
  );
}

export default App;
