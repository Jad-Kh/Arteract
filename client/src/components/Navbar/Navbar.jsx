import "./Navbar.css"
import { Search, Person, Chat, Notifications }  from "@material-ui/icons"
import { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";

export default function Navbar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
                    <div className="navbarIconItem">
                        <Notifications/>
                        <span className="navbarIconBadge">1</span>
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
        </div>
    );
}