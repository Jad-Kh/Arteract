import "./Chatlist.css";
import Conversation from "../Conversation/Conversation";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Chatlist() {

    const [ conversations, setConversations ] = useState([]);
    const [ friends, setFriends ] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchConversations = async() => {
            const response = await axios.get("/conversations/" + user._id);
            setConversations(response.data);
        };
        const fetchFriends = async() => {
            const response = await axios.get("/users/" + user._id + "/friends");
            setFriends(response.data);
        }
        fetchFriends();
        fetchConversations();
    }, [user._id]);

    return (
        <div className="chatlistContainer">
            <div className="chatlistInsiderFriends">
                <input placeholder="Search for friends" className="chatlistInput"/>
                <div className="chatlistFriends">
                    {friends.map(friend => (       
                        <li className="chatlistFriend">
                            <div className="chatlistFriendImgContainer">
                                <img className="chatlistFriendImg" src={"assets/avatar/" + friend.profilePicture} alt=""/>
                                <span className="chatlistFriendOnlineBadge"></span>
                            </div>
                            <span className="chatlistFriendOnlineUsername">{friend.username}</span>
                        </li>
                    ))}
                </div>
            </div>
            <div className="chatlistInsiderConversations">
                <input placeholder="Search for conversations" className="chatlistInput"/>
                <div className="chatlistConversations">
                    {conversations.map((c) => (
                        <Conversation conversation={c} currentUser={user}/>
                    ))}
                </div>
            </div>
        </div>
    )
}