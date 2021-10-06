import "./Friends.css"
import { useState, useEffect } from 'react'
import axios from "axios";

export default function Friends({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [ friends, setFriends ] = useState([]);
    useEffect(() => { 
        const fetchFriends = async() => {
            const response = await axios.get("/users/" + user._id + "/friends");
            setFriends(response.data);
        }      
        fetchFriends();
    }, [user])

    return (
        <div className="friends">
            <div className="friendsContainer">
                <span className="friendsFriendsTitle">{"Friends: " + friends.length}</span>
                <ul className="friendsFriendlist">
                    {friends.map(friend => (       
                        <li className="friendsFriend">
                            <div className="friendsFriendImgContainer">
                                <img className="friendsFriendImg" src={
                                                                        friend.profilePicture
                                                                        ? PF + "/avatar/" + friend.profilePicture
                                                                        : PF + "/avatar/default.jpg"
                                                                      } alt=""/>
                                <span className="friendsFriendOnlineBadge"></span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}