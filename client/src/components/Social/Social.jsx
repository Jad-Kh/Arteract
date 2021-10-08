import "./Social.css"
import { MarkunreadMailbox } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";

export default function Social() {

    const { user } = useContext(AuthContext);
    const [ friends, setFriends ] = useState([]);
    useEffect(() => {
        const fetchFriends = async() => {
            const response = await axios.get("/users/" + user._id + "/friends");
            setFriends(response.data);
        }
        fetchFriends();
    },[])

    return (
        <div className="social">
            <div className="socialContainer">
                <div className="dailyPostsContainer">
                    <MarkunreadMailbox htmlColor="#1877f2" className="dailyPostsIcon"/>
                    <span className="dailyPostsCounter"><b>50 new posts</b> from you and your friends today!</span>
                </div>
                <h4 className="socialFriendsTitle">Online Friends: </h4>
                <ul className="socialFriendlist">
                {friends.map(friend => (       
                    <li className="socialFriend">
                        <div className="socialFriendImgContainer">
                            <img className="socialFriendImg" src={"assets/avatar/" + friend.profilePicture} alt=""/>
                            <span className="socialFriendOnlineBadge"></span>
                        </div>
                        <span className="socialFriendOnlineUsername">{friend.username}</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}