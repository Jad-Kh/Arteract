import Post from "../../components/Post/Post"
import Share from "../../components/Share/Share"
import "./Activity.css"
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { io } from "socket.io-client";

export default function Activity() {

    const [ posts, setPosts ] = useState([]);
    const { user } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io("ws://localhost:5000"));
    });

    useEffect(() => {
        const fetchPosts = async() => {
            const response = await axios.get("/posts/activity/" + user._id);
            response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
            setPosts(response.data);
        }
        fetchPosts();
    },[user._id])

    return (
        <div className="activity">
            <div className="activityContainer">
                <Share/>
                {posts.map(p => (
                    <Post key={p._id} post={p} socket={socket} />
                ))}
            </div>
        </div>
    )
}