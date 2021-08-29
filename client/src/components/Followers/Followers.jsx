import { Visibility } from "@material-ui/icons";
import { Users } from "../../trydata.js"
import "./Followers.css"

export default function Followers() {
    return (
        <div className="followers">
            <div className="followersContainer">
                <span className="followersTitle">Followers: </span>
                <ul className="followersList">
                {Users.filter((user) => user.id !== 1992).map(u => (   
                    <li className="followersListItem">
                        <img className="followersImage" src={u.pfp} alt=""/>
                        <div className="followersUser">
                            <span className="followersUsername">{u.username}</span>
                            <span className="followersUsertitle">Follower</span>
                        </div>
                        <button className="followersButton">
                            <Visibility className="followersIcon"/> View
                        </button>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}