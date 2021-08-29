import "./Friends.css"
import { Users } from "../../trydata"

export default function Friends() {
    return (
        <div className="friends">
            <div className="friendsContainer">
                <span className="friendsFriendsTitle">{"Friends: " + Users.filter((user) => user.id !== 1992).length }</span>
                <ul className="friendsFriendlist">
                {Users.filter((user) => user.id !== 1992).map(u => (       
                        <li className="friendsFriend">
                            <div className="friendsFriendImgContainer">
                                <img className="friendsFriendImg" src={u.pfp} alt=""/>
                                <span className="friendsFriendOnlineBadge"></span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}