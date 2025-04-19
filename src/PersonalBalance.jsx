import { BalanceAmount } from "./BalanceContext"

export default function PersonalBalance() {
    const [state, dispatch] = BalanceAmount()
    return (
        <>
            <h3>Your Balance</h3>
            <h3>$ {state.accumulateTotalValue}</h3>
        </>
    )
}