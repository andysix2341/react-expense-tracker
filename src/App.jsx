import BalanceAmountProvider from "./BalanceContext"
import PersonalBalance from "./PersonalBalance"
import { BalanceHistory } from "./History"
import SubmitForm from "./SubmitForm"
import { Information } from "./Information"
export default function App() {
  return (
    <>
      <h2 className="title">Expense Tracker</h2>
      <BalanceAmountProvider>
        <PersonalBalance />
        <div className="information">
          <Information />
          <BalanceHistory />
        </div>
        <SubmitForm /> 
      </BalanceAmountProvider>
    </>
  )
}

