import "./UserStats.css"

export default function UserStats() {
    return (
        <div className="userstats">
            <div className="userstatsContainer">
                <ul className="userstatsList">
                    <li className="userstatsStat">
                        <span className="userstatsStatText">Exchanges: 10</span>
                    </li>
                    <li className="userstatsStat">
                        <span className="userstatsStatText">Uploads: 6</span>
                    </li>
                    <li className="userstatsStat">
                        <span className="userstatsStatText">Posts: 15</span>
                    </li>
                    <li className="userstatsStat">
                        <span className="userstatsStatText">Favorites: 13</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}