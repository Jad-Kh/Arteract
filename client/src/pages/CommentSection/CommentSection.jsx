import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import PostComments from "../../components/PostComments/PostComments"
import Social from "../../components/Social/Social"
import "./CommentSection.css"
import { useParams } from "react-router";
import { useState, useEffect, useContext, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { io } from "socket.io-client";

export default function CommentSection() {

    const postId = (useParams().postId).toString();
    const socket = useRef();
    const [ focusPost, setFocusPost ] = useState();
    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        const fetchPost = async() => {
            const response = await axios.get("/posts/" + postId);
            setFocusPost(response.data);
            setComments(response.data.comments);
        }
        fetchPost();
    }, [setFocusPost, postId, comments])

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="commentSectionContainer">
                <Sidebar/>
                <div className="commentSectionMiddle">
                    <PostComments focusPost={focusPost} comments={comments} socket={socket}/>
                </div>
            </div>
        </div>
    )
}