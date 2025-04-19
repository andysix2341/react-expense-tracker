import { BalanceAmount } from "./BalanceContext"
import { ACTIONS } from "./SubmitForm"

export function BalanceHistory() {
    const [state, dispatch] = BalanceAmount()

    function deleteValue(value) {
        dispatch({ type: ACTIONS.DELETE_SUBMITED_VALUE, payload:{ valueIndex: value } })
    }

    return(
        <>
            <h2>History</h2>
            {
                state.submitedValue.length > 0 && state.submitedValue.map((value, index) => {
                    return <li key={index}><span onClick={() => deleteValue(value.id)}>X</span> {value.text} {value.number}</li>
                })
            }
        </>
    )
}