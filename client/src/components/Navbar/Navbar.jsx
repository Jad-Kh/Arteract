import "./Navbar.css"
import { Search, Person, Chat, Notifications }  from "@material-ui/icons"
import { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from "../../context/AuthContext"
import { io } from "socket.io-client";

export default function Navbar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [notifications, setNotifications] = useState([]);
    const [socket, setSocket] = useState(null);
    const [open, setOpen] = useState(false);
    /*
    useEffect(() => {
        setSocket(io("ws://localhost:5000"));
    });

    useEffect(() => {
        socket?.current.emit("addUser", user._id);
    }, [user]);
    
    useEffect(() => {
        socket?.on("getNotification", data => {
            setNotifications((prev) => [...prev, data]);
        })
    }, [socket]) 

    const displayNotification = ({senderName, type}) => {
        let action;

               if(type==1) {
            action = "liked"
        } else if(type==2) {
            action = "disliked"
        } else if(type==3) {
            action = "favorited"
        }
        return (
            <span className="navbarNotification">{`${senderName} ${action} your post`}</span>
        )
    }

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    };
    */
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
                    <div className="navbarIconItem"> {/*onClick={() => setOpen(!open)}*/}
                        <Notifications/>
                        <span className="navbarIconBadge">{/*notifications.length*/}1</span>
                    </div>
                </div>
                <div className="navbarDropdown">
                    <img src={
                                user.profilePicture
                                ? PF + "avatars/" + user.profilePicture
                                : PF + "avatars/default.jpg"
                             } alt="" className="navbarImg"/>
                    <div className="navbarDropdownContent">
                        <p>Edit Profile</p>
                        <p>Settings</p>
                        <p>Log out</p>
                    </div>
                </div>
            </div>
            {/*open && (
            <div className="navbarNotifications">
                    <span className="navbarNotification">This is a notifications test</span>
                    <span className="navbarNotification">This is a notifications test</span>
                    <span className="navbarNotification">This is a notifications test</span>
                    <span className="navbarNotification">This is a notifications test</span>
                    <span className="navbarNotification">This is a notifications test</span>
                    {notifications.map((n) => displayNotification(n))}
                    <button className="navbarButton" onClick={handleRead}>
                        Mark as read
                    </button>
            </div>
            )*/}
        </div>
    );
}