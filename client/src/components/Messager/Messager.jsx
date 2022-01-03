import "./Messager.css";
import Message from "../Message/Message";
import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messager({currentChat, setCurrentChat, messages, setMessages}) {

    const [ newMessage, setNewMessage ] = useState("");
    const [ arrivalMessage, setArrivalMessage ] = useState();
    const scrollRef = useRef();
    const { user } = useContext(AuthContext);
    const socket = useRef();

    const handleSumbit = async(e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId : currentChat._id
        }

        const receiverId = currentChat.members.find(member => member !== user._id);

        socket.current?.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        const response = await axios.post("/messages", message);
        setMessages([...messages, response.data]);
        setNewMessage("");
    };

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (messageData) => {
            setArrivalMessage({
                sender: messageData.senderId,
                text: messageData.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
        });
    }, [user]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="messagerContainer">
            <div className="messagerInsider">
                {currentChat ? ( <>
                    <div className="messagerInsiderTop">
                        {messages.map((m) => (
                            <div ref={scrollRef}>
                                <Message message={m} own={m.sender === user._id}/>
                            </div>
                        ))}
                    </div>
                    <div className="messagerInsiderBottom">
                        <textarea className="messagerInput"
                                  placeholder="write something..."
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  value={newMessage}>
                        </textarea>
                        <button className="messagerInputButton" onClick={handleSumbit}>
                            Send
                        </button>
                    </div> </> ) : (
                        <span className="messagerNoConversationNotice">Start a conversation with one of your friends!</span>
                )}
            </div>
        </div>
    )
}