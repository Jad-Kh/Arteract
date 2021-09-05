import "./Friends.css"
import { useState, useEffect } from 'react'
import axios from "axios";

export default function Friends() {

    const [ friends, setFriends ] = useState([]);
    useEffect(() => {
        const fetchFriends = async() => {
            const response = await axios.get("users/612f91749c6548039c771b25/friends");
            setFriends(response.data);
        }
        fetchFriends();
    },[])

    return (
        <div className="friends">
            <div className="friendsContainer">
                <span className="friendsFriendsTitle">{"Friends: " + friends.length}</span>
                <ul className="friendsFriendlist">
                    {friends.map(friend => (       
                        <li className="friendsFriend">
                            <div className="friendsFriendImgContainer">
                                <img className="friendsFriendImg" src={"assets/avatar/" + friend.profilePicture} alt=""/>
                                <span className="friendsFriendOnlineBadge"></span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}