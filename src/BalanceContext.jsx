import { createContext, useContext, useReducer } from "react"
import { reduce, ACTIONS } from "./SubmitForm"

const BalanceAmountContext = createContext()

export function BalanceAmount() {
    return useContext(BalanceAmountContext)
}

export default function BalanceAmountProvider({ children }) {
    const [state, dispatch] = useReducer(reduce, {
        inputTextValue: '', 
        inputNumberValue: '', 
        currentCountId: JSON.parse(localStorage.getItem('CURRENT_COUNT_ID')) || 0,
        listIncome: JSON.parse(localStorage.getItem('LIST_INCOME')) || [], 
        listExpense: JSON.parse(localStorage.getItem('LIST_EXPENSE')) || [], 
        submitedValue: JSON.parse(localStorage.getItem('SUBMITED_VALUE')) || []
    })
    return (
        <BalanceAmountContext.Provider value={[state, dispatch]}>
            {children}
        </BalanceAmountContext.Provider>
    )
}