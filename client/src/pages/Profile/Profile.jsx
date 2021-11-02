import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"
import Share from "../../components/Share/Share"
import Post from "../../components/Post/Post"
import Friends from "../../components/Friends/Friends"
import UserStats from "../../components/UserStats/UserStats"
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useParams } from "react-router";
import "./Profile.css"

export default function Profile() {

    const [ profileUser, setProfileUser ] = useState({});
    const [ posts, setPosts ] = useState([]);
    const { user } = useContext(AuthContext);
    const username = useParams().username;

    useEffect(() => {
        const fetchProfileUser = async() => {
            const response = await axios.get("/users/user/" + username);
            setProfileUser(response.data);
        }; 
        const fetchPosts = async() => {
            const response = await axios.get("/posts/profile/" + profileUser._id);
            response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
            setPosts(response.data);
        };    
        fetchProfileUser();
        fetchPosts();  
    }, [profileUser._id, username, user])

    return (
        <div>
            <Navbar/>
            <div className="profileContainer">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <Header user={profileUser}/>
                    </div>
                    <div className="profileRightBottom">
                        <div className="profileRightBottomLeft">
                            { username === user.username && <Share/> } 
                            {posts.map(p => ( 
                                <Post key={p._id} post={p} /> 
                            )) } 
                        </div>
                        <div className="profileRightBottomRight">
                            <UserStats user={profileUser}/>
                            <Friends user={profileUser}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}