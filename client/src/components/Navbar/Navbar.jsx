import "./Navbar.css"
import { Search, Person, Chat, Notifications }  from "@material-ui/icons"
import { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { io } from "socket.io-client";

export default function Navbar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [notifications, setNotifications] = useState([]);
    const [requestNotifications, setRequestNotifications] = useState([]);
    const socket = useRef();
    const [open, setOpen] = useState(false);
    const [requestOpen, setRequestOpen] = useState(false);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, []);

    useEffect(() => {
        socket.current?.on("getNotification", (notification) => {
            setNotifications((prev) => [...prev, notification]);
        });
    }, [socket]);

    useEffect(() => {
        socket.current?.emit("addUser", user?._id);
    }, [socket, user]);

    useEffect(() => {
        const fetchFriendRequests = async() => {
            const response = await axios.get("/users/" + user?._id + "/requests");
            setRequestNotifications(response.data);
        }
        fetchFriendRequests();
    }, [user, user?.requests, requestNotifications]);

    const fetchAction = (notification) => {
        
        let action = "";

               if(notification.type === 1) {
            action = "liked your post";
        } else if(notification.type === 2) {
            action = "disliked your post";
        } else if(notification.type === 3) {
            action = "favorited your post";
        } else if(notification.type === 4) {
            action = "commented on your post";
        } else if(notification.type === 5) {
            action = "followed you";
        }

        return action;
    }

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    };
    
    const handleFriendsAccept = async(friendRequest) => {
        try {
            await axios.put("/users/" + user?._id + "/acceptfriendrequest", { userId: friendRequest._id });
            handleFriendsNotifications(friendRequest);
        } catch(error) {
            console.log(error)
        }
    };

    const handleFriendsDeny = async(friendRequest) => {
        try {
            await axios.put("/users/" + user?._id + "/denyfriendrequest", { userId: friendRequest._id });
            handleFriendsNotifications(friendRequest);
        } catch(error) {
            console.log(error)
        }        
    };

    const handleFriendsNotifications = (friendRequest) => {
        const updatedRequestNotifications = requestNotifications.filter((rN) => rN._id !== friendRequest._id)
        setRequestNotifications(updatedRequestNotifications)
    }

    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <span className="navbarLogo">Arteract</span>
            </div>
            <div className="navbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search..." className="searchInput"/>
                </div>    
            </div>
            <div className="navbarRight">
                <div className="navbarLinks">
                    <span className="navbarLink">Mainpage</span>
                    <span className="navbarLink">Logout</span>
                </div>
                <div className="navbarIcons">
                    <div className="navbarIconItem" onClick={() => setRequestOpen(!requestOpen)}>
                        <Person/>
                        <span className="navbarIconBadge">{requestNotifications.length}</span>
                    </div>
                    <div className="navbarIconItem">
                        <Chat/>
                        <span className="navbarIconBadge">1</span>
                    </div>
                    <div className="navbarIconItem" onClick={() => setOpen(!open)}>
                        <Notifications/>
                        <span className="navbarIconBadge">{notifications.length}</span>
                    </div>
                </div>
                <div className="navbarDropdown">
                    <img src={
                                user?.profilePicture
                                ? PF + "avatars/" + user?.profilePicture
                                : PF + "avatars/default.jpg"
                             } alt="" className="navbarImg"/>
                    <div className="navbarDropdownContent">
                        <p>Edit Profile</p>
                        <p>Settings</p>
                        <p>Log out</p>
                    </div>
                </div>
            </div>
            {open && (
            <div className="navbarNotifications">
                    {notifications.map((n) =>  
                        <span className="navbarNotification">{`${n.senderId} ${fetchAction(n)}`}</span>)
                    }
                    <button className="navbarButton" onClick={handleRead}>
                        Mark as read
                    </button>
            </div>
            )}
            {requestOpen && (
            <div className="navbarNotifications">
                    {requestNotifications.map((rN) =>  
                    <>
                        <span className="navbarNotification">{`You have a request from ${rN.username}`}</span>
                        <button className="navbarFriendButton" onClick={() => {handleFriendsAccept(rN)}}>
                            Accept
                        </button>
                        <button className="navbarFriendButton" onClick={() => {handleFriendsDeny(rN)}}>
                            Deny
                        </button>
                    </>)
                    }
            </div>
            )}
        </div>
    );
}