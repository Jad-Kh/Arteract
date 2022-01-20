import "./Chatlist.css";
import Conversation from "../Conversation/Conversation";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Chatlist({setCurrentChat, onlineUsers}) {

    const [ conversations, setConversations ] = useState([]);
    const [ friends, setFriends ] = useState([]);
    const [ onlineList, setOnlineList ] = useState([]);
    const [ offlineList, setOfflineList ] = useState([]);
    const { user } = useContext(AuthContext);

    const handleConversationClick = (conversation) => {
        setCurrentChat(conversation);
    }

    const handleFriendClick = async(friend) => {
        var found = false;
        const response = await axios.get("/conversations/" + user._id);
        response.data.map((c) => {
            const friendId = c.members.find(member => member !== user._id);
            friendId == friend._id ? found = true : console.log("fetching...")
        })
        found === false ? addConversation(friend) : found = false;
    }

    const addConversation = async(friend) => {
        const response = await axios.post("/conversations/" + user._id + "/" + friend._id);
        setConversations([ ...conversations, response.data])
    }

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

    useEffect(() => {
        setOnlineList(friends.filter((f) => onlineUsers.some((f2) => f2 === f._id)));
        setOfflineList(friends.filter((f) => !onlineUsers.some((f2) => f2 === f._id)));
    }, [friends, onlineUsers]);

    return (
        <div className="chatlistContainer">
            <div className="chatlistInsiderFriends">
                <input placeholder="Search for friends" className="chatlistInput"/>
                <div className="chatlistFriends">
                    {onlineList.map(friend => (       
                        <li className="chatlistFriend" onClick={() => handleFriendClick(friend)}>
                            <div className="chatlistFriendImgContainer">
                                <img className="chatlistFriendImg" src={"assets/avatar/" + friend.profilePicture} alt=""/>
                                <span className="chatlistFriendOnlineBadge"></span> 
                            </div>
                            <span className="chatlistFriendOnlineUsername">{friend.username}</span>
                        </li>
                    ))}
                    {offlineList.map(friend => (       
                        <li className="chatlistFriend" onClick={() => handleFriendClick(friend)}>
                            <div className="chatlistFriendImgContainer">
                                <img className="chatlistFriendImg" src={"assets/avatar/" + friend.profilePicture} alt=""/>
                                <span className="chatlistFriendOfflineBadge"></span> 
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
                        <div onClick={() => handleConversationClick(c)}>
                            <Conversation conversation={c} currentUser={user}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}