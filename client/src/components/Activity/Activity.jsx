import Post from "../../components/Post/Post"
import Share from "../../components/Share/Share"
import "./Activity.css"
import { Posts } from "../../trydata"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Activity() {

    const [ posts, setPosts ] = useState([]);
    useEffect(() => {
        const fetchPosts = async() => {
            const response = await axios.get("posts/activity/612f91749c6548039c771b25");
            setPosts(response.data);
        }
        fetchPosts();
    },[])

    return (
        <div className="activity">
            <div className="activityContainer">
                <Share/>
                {posts.map(p => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    )
}