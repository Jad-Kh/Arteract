import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import InfoBoxes from "../../components/InfoBoxes/InfoBoxes"
import Chart from "../../components/Chart/Chart"
import TransactionsWidgets from "../../components/TransactionsWidgets/TransactionsWidgets"
import "./Transactions.css"

export default function Transactions({socket}) {
    return (
        <div>
            <Navbar socket={socket}/>
            <div className="transactionsContainer">
                <Sidebar/>
                <div className="transactionsMiddle">
                    <InfoBoxes/>
                    <Chart/>
                    <TransactionsWidgets/>
                </div>
            </div>
        </div>
    )
}