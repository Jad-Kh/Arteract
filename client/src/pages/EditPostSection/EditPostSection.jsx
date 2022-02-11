import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import EditPost from "../../components/EditPost/EditPost";
import "./EditPostSection.css"
import { useParams } from "react-router";
import { useState, useEffect, useContext, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { io } from "socket.io-client";

export default function EditPostSection() {

    const postId = (useParams().postId).toString();
    const socket = useRef();
    const [ focusPost, setFocusPost ] = useState();

    useEffect(() => {
        const fetchPost = async() => {
            const response = await axios.get("/posts/" + postId);
            setFocusPost(response.data);
        }
        fetchPost();
    }, [setFocusPost, postId])

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="editPostSectionContainer">
                <Sidebar/>
                <div className="editPostSectionMiddle">
                    <EditPost post={focusPost}/>
                </div>
            </div>
        </div>
    )
}