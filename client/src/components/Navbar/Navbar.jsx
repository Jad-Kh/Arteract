import "./Navbar.css"
import { Search, Person, Chat, Notifications }  from "@material-ui/icons"
import { useState, useEffect } from 'react'
import axios from "axios";

export default function Navbar() {

    const [ user, setUser ] = useState({});
    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get(`users/612f91749c6548039c771b25`);
            setUser(response.data);
        }
        fetchUser();
    }, [])

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
                <img src={user.profilePicture} alt="" className="navbarImg"/>
            </div>
        </div>
    );
}