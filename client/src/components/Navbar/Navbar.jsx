import "./Navbar.css"
import { Search, Person, Chat, Notifications }  from "@material-ui/icons"
import { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from "../../context/AuthContext"
import { io } from "socket.io-client";

export default function Navbar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [notifications, setNotifications] = useState([]);
    const socket = useRef();
    const [open, setOpen] = useState(false);

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

    const fetchAction = (notification) => {
        
        let action = "";

               if(notification.type === 1) {
            action = "liked";
        } else if(notification.type === 2) {
            action = "disliked";
        } else if(notification.type === 3) {
            action = "favorited";
        } else if(notification.type === 4) {
            action = "commented on";
        }

        return action;
    }

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    };
    
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
                    <div className="navbarIconItem">
                        <Person/>
                        <span className="navbarIconBadge">1</span>
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
                        <span className="navbarNotification">{`${n.senderId} ${fetchAction(n)} your post`}</span>)
                    }
                    <button className="navbarButton" onClick={handleRead}>
                        Mark as read
                    </button>
            </div>
            )}
        </div>
    );
}