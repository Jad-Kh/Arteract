import "./Social.css"
import { MarkunreadMailbox } from "@material-ui/icons";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";
import { io } from "socket.io-client";

export default function Social() {

    const { user } = useContext(AuthContext);
    const [ friends, setFriends ] = useState([]);
    const socket = useRef();
    const [ onlineUsers, setOnlineUsers ] = useState([]);
    const [ onlineFriends, setOnlineFriends ] = useState([]);
    const [ offlineFriends, setOfflineFriends ] = useState([]);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        const fetchFriends = async() => {
            const response = await axios.get("/users/" + user._id + "/friends");
            setFriends(response.data);
        }
        fetchFriends();
    },[]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(
                user.friends.filter((f) => users.some((u) => u.userId === f))
            );
        });
    }, [user]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.some((f2) => f2 === f._id)));
        setOfflineFriends(friends.filter((f) => !onlineUsers.some((f2) => f2 === f._id)));
    }, [friends, onlineUsers]);

    return (
        <div className="social">
            <div className="socialContainer">
                <div className="dailyPostsContainer">
                    <MarkunreadMailbox htmlColor="#1877f2" className="dailyPostsIcon"/>
                    <span className="dailyPostsCounter"><b>50 new posts</b> from you and your friends today!</span>
                </div>
                <h4 className="socialFriendsTitle">Online Friends: </h4>
                <ul className="socialFriendlist">
                {onlineFriends.map(friend => (       
                    <li className="socialFriend">
                        <div className="socialFriendImgContainer">
                            <img className="socialFriendImg" src={"assets/avatar/" + friend.profilePicture} alt=""/>
                            <span className="socialFriendOnlineBadge"></span>
                        </div>
                        <span className="socialFriendOnlineUsername">{friend.username}</span>
                    </li>
                ))}
                {offlineFriends.map(friend => (       
                    <li className="socialFriend">
                        <div className="socialFriendImgContainer">
                            <img className="socialFriendImg" src={"assets/avatar/" + friend.profilePicture} alt=""/>
                            <span className="socialFriendOfflineBadge"></span>
                        </div>
                        <span className="socialFriendOnlineUsername">{friend.username}</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    )
}