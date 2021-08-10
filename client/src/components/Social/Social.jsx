import "./Social.css"
import { MarkunreadMailbox } from "@material-ui/icons";
import { Users } from "../../trydata"

export default function Social() {
    return (
        <div className="social">
            <div className="socialContainer">
                <div className="dailyPostsContainer">
                    <MarkunreadMailbox htmlColor="#1877f2" className="dailyPostsIcon"/>
                    <span className="dailyPostsCounter"><b>50 new posts</b> from you and your friends today!</span>
                </div>
                <h4 className="socialFriendsTitle">Online Friends: </h4>
                <ul className="socialFriendlist">
                {Users.filter((user) => user.id !== 1992).map(u => (       
                    <li className="socialFriend">
                        <div className="socialFriendImgContainer">
                            <img className="socialFriendImg" src={u.pfp} alt=""/>
                            <span className="socialFriendOnlineBadge"></span>
                        </div>
                        <span className="socialFriendOnlineUsername">{u.username}</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}