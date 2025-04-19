import { BalanceAmount } from "./BalanceContext"

export function Information() {
    const [state, dispatch] = BalanceAmount()
    return (
        <>
            <div className="income">
                <h4>INCOME</h4>
                <div className="income-value">$ {state.accumulateIncomeValue || "0.00"}</div>
            </div>
            <div className="expense">
              <h4>EXPENSE</h4>
              <div className="expense-value">$ {state.accumulateExpenseValue || "0.00"}</div>
            </div>
        </>
    )
}