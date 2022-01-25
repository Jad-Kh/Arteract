import { createRef, useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import "./WriteComment.css"
import { Label, EmojiEmotions } from "@material-ui/icons"
import Picker from "emoji-picker-react"
import axios from "axios"

export default function WriteComment({post, socket}) {

    const { user: currentUser } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const inputRef = createRef();
    const [message, setMessage] = useState('');
    const [showEmojis, setShowEmojis] = useState();
    const [cursorPosition, setCursorPosition] = useState();
    const [hideState, setHideState] = useState('true');

    const changeVisibility = () => {
        setHideState(!hideState);
    }

    const pickEmoji = (e, { emoji }) => {
        const ref = inputRef.current;
        ref.focus();
        const start = message.substring(0, ref.selectionStart);
        const end = message.substring(ref.selectionStart);
        const text = start + emoji + end;
        setMessage(text);
        setCursorPosition(start.length + emoji.length);
    }

    const handleChange = e => {
        setMessage(e.target.value);
    }
    
    const handleNotification = (type) => {

        const receiverId = post?.userId;

        socket.current?.emit("sendNotification", {
            senderId: currentUser?.username,
            receiverId,
            type,
        });

    };

    const submitHandler = async(e) => {
        e.preventDefault()
        const newComment = {
            userId: currentUser._id,
            text: inputRef.current.value,
            timestamp: Date.now()
        }
        try {
            await axios.put("/posts/" + post._id + "/comment", newComment);
            handleNotification(4);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    let emojiClass = hideState ? "emojiPickerContainerHidden" : "emojiPickerContainer" ;

    return (
        <div className="writeComment"> 
            <div className="writeCommentContainer">
                <div className="writeCommentTop">
                    <img className="writeCommentImg" src={
                                                            currentUser?.profilePicture
                                                            ? PF + "avatars/" + currentUser?.profilePicture
                                                            : PF + "avatars/default.jpg"
                                                        } alt="" />
                    <input className="writeCommentInput" placeholder={ "What's on your mind " + currentUser?.username + "?" }
                     value={message} onChange={handleChange} ref={inputRef}/>
                </div>
                <hr className="writeCommentLine"></hr>
                <form className="writeCommentBottom" onSubmit={submitHandler}>
                    <div className="writeCommentOptions">
                        <div className="writeCommentOptionsItem">
                            <Label htmlColor="lightgreen" className="writeCommentIcon"/>
                            <span>Tag</span>
                        </div>
                        <div className="writeCommentOptionsItem">
                            <EmojiEmotions htmlColor="lightgreen" className="writeCommentIcon" onClick={changeVisibility}/>
                            <span>Emojies</span>
                        </div>
                    </div>
                    <button className="writeCommentButton">Post</button>
                </form>
                { 
                <div className={emojiClass}>
                    <div className={`emoji-list ${!showEmojis && 'hidden'}`}>
                        <Picker className="emojiPicker" onEmojiClick={pickEmoji}/>
                    </div>
                </div>
                }  
            </div> 
        </div>
    )
}