import { Visibility } from "@material-ui/icons";
import { Users } from "../../trydata.js"
import "./Requests.css"

export default function Requests() {
    return (
        <div className="requests">
            <div className="requestsContainer">
                <span className="requestsTitle">Requests: </span>
                <ul className="requestsList">
                {Users.filter((user) => user.id !== 1992).map(u => (   
                    <li className="requestsListItem">
                        <img className="requestsImage" src={u.pfp} alt=""/>
                        <div className="requestsUser">
                            <span className="requestsUsername">{u.username}</span>
                            <span className="requestsUsertitle">Follower</span>
                        </div>
                        <button className="requestsButton">
                            <Visibility className="requestsIcon"/> View
                        </button>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}