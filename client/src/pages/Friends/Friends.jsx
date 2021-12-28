import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Friendslist from "../../components/Friendslist/Friendslist"
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useParams } from "react-router";
import "./Friends.css"

export default function Friends({socket}) {
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ profileUser, setProfileUser ] = useState({});
    const { user } = useContext(AuthContext);
    const username = useParams().username;

    useEffect(() => {
        const fetchProfileUser = async() => {
            const response = await axios.get("/users/user/" + username);
            setProfileUser(response.data);
        };        
        fetchProfileUser(); 
    }, [username, user])

    return (
        <div>
            <Navbar socket={socket}/>
            <div className="friends">
                <Sidebar/>
                <Friendslist user={profileUser}/>
            </div>
        </div>
    )
}