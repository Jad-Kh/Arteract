import "./Social.css"
import { MarkunreadMailbox } from "@material-ui/icons";

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
                    <li className="socialFriend">
                        <div className="socialFriendImgContainer">
                            <img className="socialFriendImg" src="" alt=""/>
                            <span className="socialFriendOnlineBadge"></span>
                        </div>
                        <span className="socialFriendOnlineUsername">Username</span>
                    </li>
                    <li className="socialFriend">
                        <div className="socialFriendImgContainer">
                            <img className="socialFriendImg" src="" alt=""/>
                            <span className="socialFriendOnlineBadge"></span>
                        </div>
                        <span className="socialFriendOnlineUsername">Username</span>
                    </li>
                    <li className="socialFriend">
                        <div className="socialFriendImgContainer">
                            <img className="socialFriendImg" src="" alt=""/>
                            <span className="socialFriendOnlineBadge"></span>
                        </div>
                        <span className="socialFriendOnlineUsername">Username</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}