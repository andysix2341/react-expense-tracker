import { useEffect } from "react"
import { BalanceAmount } from "./BalanceContext"

export const ACTIONS = {
  UPDATE_INPUT_TEXT_VALUE: 'update_input_text_value',
  UPDATE_INPUT_NUMBER_VALUE: 'update_input_number_value',
  SUBMIT_INPUT_VALUE: 'submit_input_value',
  ACCUMULATE_SUBMIT_VALUE: 'accumulate_submit_value',
  ACCUMULATE_INCOME_VALUE: 'accumulate_income_value',
  ACCUMULATE_EXPENSE_VALUE: 'accumulate_expense_value',
  DELETE_SUBMITED_VALUE: 'delete_submited_value'
}

export function reduce(state, { type, payload }) {
  switch(type) {
    case ACTIONS.UPDATE_INPUT_TEXT_VALUE:
      return {
        ...state,
        inputTextValue: payload.currentInputText
      }
    case ACTIONS.UPDATE_INPUT_NUMBER_VALUE:
      return {
        ...state,
        inputNumberValue: payload.currentInputNumber
      }
    case ACTIONS.SUBMIT_INPUT_VALUE:
      const value = {id: state.currentCountId, text: state.inputTextValue, number: parseInt(state.inputNumberValue)}
      
      if (value.number < 0) {
        return {
          ...state,
          currentCountId: state.currentCountId + 1,
          listExpense: [...state.listExpense, value],
          submitedValue: [...state.submitedValue, value],
          inputTextValue: '',
          inputNumberValue: ''
        }
      } 

      return {
        ...state,
        currentCountId: state.currentCountId + 1,
        listIncome: [...state.listIncome, value],
        submitedValue: [...state.submitedValue, value],
        inputTextValue: '',
        inputNumberValue: ''
      }
      
    case ACTIONS.ACCUMULATE_SUBMIT_VALUE:
      const accumTotal = state.submitedValue.reduce((acc, currentTotal) => {
        return acc + currentTotal.number
      }, 0)
      return {
        ...state,
        accumulateTotalValue: accumTotal
      }
    
    case ACTIONS.ACCUMULATE_INCOME_VALUE:
      const accumIncome = state.listIncome.reduce((acc, currentTotal) => {
        return acc + currentTotal.number
      }, 0)
      return {
        ...state,
        accumulateIncomeValue: accumIncome
      }
    case ACTIONS.ACCUMULATE_EXPENSE_VALUE:
      const accumExpense = state.listExpense.reduce((acc, currentTotal) => {
        return acc + currentTotal.number
      }, 0)
      return {
        ...state,
        accumulateExpenseValue: accumExpense
      }
    case ACTIONS.DELETE_SUBMITED_VALUE: 
      const filteredNotSubmitedValue = state.submitedValue.filter(value => value.id !== payload.valueIndex)
      const filteredNotIncomeValue = state.listIncome.filter(value => value.id !== payload.valueIndex)
      const filteredNotExpenseValue = state.listExpense.filter(value => value.id !== payload.valueIndex)

      return {
        ...state,
        listIncome: filteredNotIncomeValue,
        listExpense: filteredNotExpenseValue,
        submitedValue: filteredNotSubmitedValue
      }
  }

} 

function handleSubmit(e, state,dispatch) {
  e.preventDefault()
  if (state.inputTextValue === '' || state.inputNumberValue === '') return alert('please fill input')
  if (isNaN(state.inputNumberValue)) return alert('Please insert number not the text')
  dispatch({ type: ACTIONS.SUBMIT_INPUT_VALUE })
  
}

function save(key, state) {
  return localStorage.setItem(key, JSON.stringify(state))
}

export default function SubmitForm() {
    const [state, dispatch] = BalanceAmount()

    useEffect(() => {
      dispatch({ type: ACTIONS.ACCUMULATE_SUBMIT_VALUE })
      dispatch({ type: ACTIONS.ACCUMULATE_INCOME_VALUE })
      dispatch({ type: ACTIONS.ACCUMULATE_EXPENSE_VALUE })
      save('CURRENT_COUNT_ID', state.currentCountId)
      save('SUBMITED_VALUE', state.submitedValue)
      save('LIST_INCOME', state.listIncome)
      save('LIST_EXPENSE', state.listExpense)

    }, [state.submitedValue])
    
    return (
        <form className="new-transaction">
          <h2>Add New Transaction</h2>
          <div>
            <div className="title">Text</div>
            <input 
              type="text" 
              placeholder="Enter Text" 
              value={state.inputTextValue || ''}
              onChange={e => dispatch({ type: ACTIONS.UPDATE_INPUT_TEXT_VALUE, payload: { currentInputText: e.target.value }})}
            />
          </div>
          <div>
            <div className="amount">amount(negative-expense, positive-income)</div>
            <input 
              type="text" 
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="50.000"
              value={state.inputNumberValue}
              onChange={e => dispatch({ type: ACTIONS.UPDATE_INPUT_NUMBER_VALUE, payload: { currentInputNumber: e.target.value } })}
            />
          </div>
          <button onClick={e => handleSubmit(e, state, dispatch)} className="submit">Submit</button>
        </form>
    )
}