import "./Chat.css";
import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Messager from "../../components/Messager/Messager"
import Chatlist from "../../components/Chatlist/Chatlist"
import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

export default function Chat() {

    const [ currentChat, setCurrentChat ] = useState();
    const [ messages, setMessages ] = useState([]);
    const [ onlineUsers, setOnlineUsers ] = useState([]);

    useEffect(() => {
        const fetchMessages = async() => {
            const response = await axios.get("/messages/" + currentChat?._id);
            setMessages(response.data);
        };
        fetchMessages();
    }, [currentChat]);

    return (
        <div>
            <Navbar/>
            <div className="chatContainer">
                <Sidebar/>
                <Messager currentChat={currentChat} messages={messages} setMessages={setMessages} setOnlineUsers={setOnlineUsers}/>
                <Chatlist setCurrentChat={setCurrentChat} onlineUsers={onlineUsers}/>
            </div>
        </div>
    )
}