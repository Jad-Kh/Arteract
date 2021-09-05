import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"
import Share from "../../components/Share/Share"
import Post from "../../components/Post/Post"
import Friends from "../../components/Friends/Friends"
import UserStats from "../../components/UserStats/UserStats"
import axios from "axios"
import { useState, useEffect } from "react"
import "./Profile.css"


export default function Profile() {

    const [ posts, setPosts ] = useState([]);
    useEffect(() => {
        const fetchPosts = async() => {
            const response = await axios.get("posts/posts/612f91749c6548039c771b25");
            setPosts(response.data);
        }
        fetchPosts();
    },[])

    return (
        <div>
            <Navbar/>
            <div className="profileContainer">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <Header/>
                    </div>
                    <div className="profileRightBottom">
                        <div className="profileRightBottomLeft">
                            <Share/>
                            {posts.map(p => (
                                <Post key={p._id} post={p} />
                            ))}
                        </div>
                        <div className="profileRightBottomRight">
                            <UserStats/>
                            <Friends/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}