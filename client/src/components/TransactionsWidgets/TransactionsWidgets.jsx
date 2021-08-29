import Followers from "../Followers/Followers"
import Exchanges from "../Exchanges/Exchanges"
import "./TransactionsWidgets.css"

export default function TransactionsWidgets() {
    return (
        <div className="transactionsWidgets">
            <Followers/>
            <Exchanges/>
        </div>
    )
}