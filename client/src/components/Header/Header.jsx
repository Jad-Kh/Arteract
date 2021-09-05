import "./Header.css"
import { useState, useEffect } from 'react'
import axios from "axios";

export default function Header() {

    const [ user, setUser ] = useState({});
    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get(`users/612f91749c6548039c771b25`);
            setUser(response.data);
            console.log(user);
        }
        fetchUser();
    }, [])

    return (
        <div className="header">
            <div className="headerContainer">
                <div className="headerTop">
                    <img className="headerCoverImg" src={"assets/backgrounds/" + user.coverPicture} alt=""/>
                    <img className="headerProfileImg" src={"assets/avatars/" + user.profilePicture} alt=""/>
                    <button className="headerButton">Add Friend</button>
                    <button className="headerButton">Follow    </button>
                </div>
                <div className="headerBottom">
                    <h4 className="headerName">{user.username}</h4>
                    <span className="headerDesc">Hello, hope you're doing well!</span>
                </div>  
            </div>
        </div>
    )
}