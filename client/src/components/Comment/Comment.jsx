import "./Comment.css"
import { MoreVert } from "@material-ui/icons"
import { useState, useEffect, useContext } from "react"
import { format } from "timeago.js"
import axios from "axios"

export default function Comment({comment}) {

    const [ user, setUser ] = useState();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get("/users/" + comment?.userId)
            setUser(response.data);
        };
        fetchUser();
    });

    return (
        <div className="comment">
            <div className="commentContainer">
                <div className="commentTop">
                    <div className="commentTopLeft">
                        <img className="commentImg" src={
                                                            user?.profilePicture
                                                            ? PF + "avatars/" + user?.profilePicture
                                                            : PF + "avatars/default.jpg"
                                                        } alt=""/>
                        <span className="commentUsername">{user?.username}</span>
                        <span className="commentDate">{format(comment?.timestamp)}</span>
                     </div> 
                     <div className="commentTopRight">
                         <MoreVert htmlColor="lightgreen"/>
                     </div>
                </div>
            </div>
            <div className="commentContent">
                     <span className="commentText">{comment?.text}</span>
                 </div>
        </div>
    )
}