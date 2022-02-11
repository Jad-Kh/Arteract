import { createRef, useRef, useEffect, useState, useContext } from 'react';
import "./EditPost.css";
import { PermMedia, Label, EmojiEmotions } from "@material-ui/icons";
import Picker from "emoji-picker-react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function EditPost({post}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [file, setFile] = useState();

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

    const submitHandler = async(e) => {
        e.preventDefault()
        const newPost = {
            userId: user?._id,
            description: inputRef.current.value
        }
        if(file) {
            const data = new FormData();
            const filename = (Date.now() + file.name).slice(0,9) + (Date.now() + file.name).slice(-4); // Date added to prevent conflict If 2 users uploaded a picture with same name
            data.append("file", file);
            data.append("name", filename);
            newPost.image = filename;
            try {
                await axios.post("/uploadpost", data);
            } catch(error) {
                console.log(error);
            }
        }
        try {
            await axios.post("/posts", newPost);
            setMessage('');
        } catch(error) {
            console.log(error);
        }
    }

    const [ user, setUser ] = useState({});
    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get("/users/" + post?.userId);
            setUser(response.data);
        }
        fetchUser();
        inputRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition], post?.userId)

    let emojiClass = hideState ? "emojiPickerContainerHidden" : "emojiPickerContainer" ;

    return (
        <div className="editPost"> 
            <div className="editPostContainer">
                <div className="editPostTop">
                    <img className="editPostImg" src={
                                                    user?.profilePicture
                                                    ? PF + "avatars/" + user?.profilePicture
                                                    : PF + "avatars/default.jpg"
                                                  } alt=""/>
                    <input className="editPostInput" placeholder={ 
                                                                    post?.description === ""
                                                                    ? "Want to write something?"
                                                                    : post?.description
                                                                 }
                     value={message} onChange={handleChange} ref={inputRef}/>
                </div>
                <div className="editPostCenter">
                     <img className="editPostContentImg" src={PF + "posts/" + post?.image} alt=""/>
                 </div>
                <hr className="editPostLine"></hr>
                <form action="/api/uploadavatar" className="editPostBottom" onSubmit={submitHandler}>
                    <div className="editPostOptions">
                        <label htmlFor="file" className="editPostOptionsItem">
                            <div class="fileUpload">
                                <PermMedia htmlColor="lightgreen" className="editPostIcon"/>
                            </div>
                            <span>Art Content</span>
                            <input type="file" id="file" accept=".png,.jpeg,.jpg,.gif" style={{ display: "none" }}
                                   onChange={ (e) => setFile(e.target.files[0]) }/>
                        </label>
                        <div className="editPostOptionsItem">
                            <Label htmlColor="lightgreen" className="editPostIcon"/>
                            <span>Tag</span>
                        </div>
                        <div className="editPostOptionsItem">
                            <EmojiEmotions htmlColor="lightgreen" className="editPostIcon" onClick={changeVisibility}/>
                            <span>Emojies</span>
                        </div>
                    </div>
                    <button className="editPostButton">Edit</button>
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