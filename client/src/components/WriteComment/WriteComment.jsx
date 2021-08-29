import { createRef, useEffect, useState } from 'react';
import "./WriteComment.css"
import { Label, EmojiEmotions } from "@material-ui/icons"
import Picker from "emoji-picker-react"
import { Users } from "../../trydata"

export default function WriteComment() {

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
    
    useEffect(() => {
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    let emojiClass = hideState ? "emojiPickerContainerHidden" : "emojiPickerContainer" ;

    return (
        <div className="writeComment"> 
            <div className="writeCommentContainer">
                <div className="writeCommentTop">
                    <img className="writeCommentImg" src={ Users.filter((u) => u.id === 1992)[0].pfp } alt="" />
                    <input className="writeCommentInput" placeholder={ "What's on your mind " + Users.filter((u) => u.id === 1992)[0].username + "?" }
                     value={message} onChange={handleChange} ref={inputRef}/>
                </div>
                <hr className="writeCommentLine"></hr>
                <div className="writeCommentBottom">
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