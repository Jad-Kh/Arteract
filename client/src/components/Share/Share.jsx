import { createRef, useEffect, useState } from 'react';
import "./Share.css"
import { PermMedia, Label, EmojiEmotions } from "@material-ui/icons"
import Picker from "emoji-picker-react"
import axios from "axios";

export default function Share() {

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

    const [ user, setUser ] = useState({});
    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get(`users/612f91749c6548039c771b25`);
            setUser(response.data);
        }
        fetchUser();
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition])

    let emojiClass = hideState ? "emojiPickerContainerHidden" : "emojiPickerContainer" ;

    return (
        <div className="share"> 
            <div className="shareContainer">
                <div className="shareTop">
                    <img className="shareImg" src={user.profilePicture} alt="" />
                    <input className="shareInput" placeholder={ "What's on your mind " + user.username + "?" }
                     value={message} onChange={handleChange} ref={inputRef}/>
                </div>
                <hr className="shareLine"></hr>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOptionsItem">
                            <div class="fileUpload">
                                <PermMedia htmlColor="lightgreen" className="shareIcon"/>
                                <input type="file" class="upload"></input>
                            </div>
                            <span>Art Content</span>
                        </div>
                        <div className="shareOptionsItem">
                            <Label htmlColor="lightgreen" className="shareIcon"/>
                            <span>Tag</span>
                        </div>
                        <div className="shareOptionsItem">
                            <EmojiEmotions htmlColor="lightgreen" className="shareIcon" onClick={changeVisibility}/>
                            <span>Emojies</span>
                        </div>
                    </div>
                    <button className="shareButton">Post</button>
                </div>
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