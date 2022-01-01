import { useEffect, useState } from "react";
import axios from "axios";
import "./Conversation.css";

export default function Conversation({conversation, currentUser}) {

    const [ user, setUser ] = useState();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);
        const fetchUser = async() => {
            try {
                const response = await axios("/users/" + friendId);
                setUser(response.data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img className="conversationPersonImage" src={
                                                            user?.profilePicture
                                                            ? PF + "avatars/" + user?.profilePicture
                                                            : PF + "avatars/default.jpg"
                                                         } alt=""/>
            <span className="conversationPersonName">{user?.username}</span>
        </div>       
    )
}