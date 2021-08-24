import "./Exchanges.css"

export default function Exchanges() {

    const Button = ({type}) => {
        return <button className={"exchangesTableButton " + type}>{type}</button>
    }

    return (
        <div className="exchanges">
            <div className="exchangesContainer">
                <span className="exchangesTitle">Latest Transactions</span>
                <table className="exchangesTable">
                    <tr className="exchangesTableRow">
                        <th className="exchangesTableHeader">Customer</th>
                        <th className="exchangesTableHeader">Date</th>
                        <th className="exchangesTableHeader">Amount</th>
                        <th className="exchangesTableHeader">Status</th>
                    </tr>
                    <tr className="exchangesTableRow">
                        <td className="exchangesTableUser">
                            <img className="exchangesTableUserImage" src="" alt=""/>
                            <span className="exchangesTableUsername">Panda Peter</span>
                        </td>
                        <td className="exchangesTableDate">2 Jun 2020</td>
                        <td className="exchangesTableAmount">$100.00</td>
                        <td className="exchangesTableStatus">
                            <Button type="Approved"/>
                        </td>
                    </tr>
                    <tr className="exchangesTableRow">
                        <td className="exchangesTableUser">
                            <img className="exchangesTableUserImage" src="" alt=""/>
                            <span className="exchangesTableUsername">Wolly Johnson</span>
                        </td>
                        <td className="exchangesTableDate">3 Jun 2020</td>
                        <td className="exchangesTableAmount">$120.00</td>
                        <td className="exchangesTableStatus">
                            <Button type="Approved"/>
                        </td>
                    </tr>
                    <tr className="exchangesTableRow">
                        <td className="exchangesTableUser">
                            <img className="exchangesTableUserImage" src="" alt=""/>
                            <span className="exchangesTableUsername">Crail Escolera</span>
                        </td>
                        <td className="exchangesTableDate">9 Jun 2020</td>
                        <td className="exchangesTableAmount">$60.00</td>
                        <td className="exchangesTableStatus">
                            <Button type="Declined"/>
                        </td>
                    </tr>
                    <tr className="exchangesTableRow">
                        <td className="exchangesTableUser">
                            <img className="exchangesTableUserImage" src="" alt=""/>
                            <span className="exchangesTableUsername">Joy Martinez</span>
                        </td>
                        <td className="exchangesTableDate">11 Jun 2020</td>
                        <td className="exchangesTableAmount">$90.00</td>
                        <td className="exchangesTableStatus">
                            <Button type="Pending"/>
                        </td>
                    </tr>
                    <tr className="exchangesTableRow">          
                        <td className="exchangesTableUser">
                            <img className="exchangesTableUserImage" src="" alt=""/>
                            <span className="exchangesTableUsername">Yura Lizard</span>
                        </td>
                        <td className="exchangesTableDate">14 Jun 2020</td>
                        <td className="exchangesTableAmount">$150.00</td>
                        <td className="exchangesTableStatus">
                            <Button type="Pending"/>
                        </td>
                    </tr>
                    <tr className="exchangesTableRow">
                        <td className="exchangesTableUser">
                            <img className="exchangesTableUserImage" src="" alt=""/>
                            <span className="exchangesTableUsername">Joy Martinez</span>
                        </td>
                        <td className="exchangesTableDate">14 Jun 2020</td>
                        <td className="exchangesTableAmount">$100.00</td>
                        <td className="exchangesTableStatus">
                            <Button type="Approved"/>
                        </td>
                    </tr>
                    <tr className="exchangesTableRow">
                        <td className="exchangesTableUser">
                            <img className="exchangesTableUserImage" src="" alt=""/>
                            <span className="exchangesTableUsername">Lee Baskil</span>
                        </td>
                        <td className="exchangesTableDate">14 Jun 2020</td>
                        <td className="exchangesTableAmount">$90.00</td>
                        <td className="exchangesTableStatus">
                            <Button type="Declined"/>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}