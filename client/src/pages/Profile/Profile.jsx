import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"
import Share from "../../components/Share/Share"
import Post from "../../components/Post/Post"
import Friends from "../../components/Friends/Friends"
import UserStats from "../../components/UserStats/UserStats"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router";
import "./Profile.css"

export default function Profile() {

    const [ user, setUser ] = useState({});
    const [ posts, setPosts ] = useState([]);
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get("/users/user/" + username);
            setUser(response.data);
        }; 
        const fetchPosts = async() => {
            const response = await axios.get("/posts/profile/" + user._id);
            setPosts(response.data);
        };    
        fetchUser();
        fetchPosts();  
    }, [user._id, username])

    return (
        <div>
            <Navbar/>
            <div className="profileContainer">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <Header user={user}/>
                    </div>
                    <div className="profileRightBottom">
                        <div className="profileRightBottomLeft">
                            <Share/> 
                            {posts.map(p => ( 
                                <Post key={p._id} post={p} /> 
                            )) } 
                        </div>
                        <div className="profileRightBottomRight">
                            <UserStats user={user}/>
                            <Friends user={user}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}