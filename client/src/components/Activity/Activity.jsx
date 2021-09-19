import Post from "../../components/Post/Post"
import Share from "../../components/Share/Share"
import "./Activity.css"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Activity() {

    const [ posts, setPosts ] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchPosts = async() => {
            const response = await axios.get("posts/activity/" + user._id);
            setPosts(response.data);
        }
        fetchPosts();
    },[user._id])

    return (
        <div className="activity">
            <div className="activityContainer">
                <Share/>
                {posts.map(p => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}