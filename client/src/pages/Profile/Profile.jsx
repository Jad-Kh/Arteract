import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"
import EditCard from "../../components/EditCard/EditCard"
import Share from "../../components/Share/Share"
import Post from "../../components/Post/Post"
import Friends from "../../components/Friends/Friends"
import UserStats from "../../components/UserStats/UserStats"
import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useParams } from "react-router";
import "./Profile.css"

export default function Profile({socket}) {

    const [ profileUser, setProfileUser ] = useState({});
    const [ posts, setPosts ] = useState([]);
    const [ visibility, setVisibility ] = useState(false);
    const { user } = useContext(AuthContext);
    const [ username, setUsername ] = useState(useParams().username);

    useEffect(() => {
        const fetchProfileUser = async() => {
            const response = await axios.get("/users/user/" + username);
            window.history.replaceState({}, "", "/profile/" + username);
            setProfileUser(response.data);
        };   
        fetchProfileUser();
    }, [username])

    useEffect(() => {
        const fetchPosts = async() => {
            const response = await axios.get("/posts/profile/" + profileUser?._id);
            response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
            setPosts(response.data);
        };    
        fetchPosts();  
    }, [profileUser, username, user])

    return (
        <div>
            <Navbar socket={socket}/>
            <div className="profileContainer">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <Header user={profileUser} visibility={visibility} setVisibility={setVisibility}/>
                    </div>
                    <div className="profileRightBottom">
                        <EditCard user={profileUser} setUsername={setUsername} visibility={visibility}/>
                        <div className="profileRightBottomLeft">
                            { username === user?.username && <Share/> } 
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