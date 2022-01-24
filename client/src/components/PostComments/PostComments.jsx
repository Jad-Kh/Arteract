import Post from "../../components/Post/Post"
import Comment from "../../components/Comment/Comment"
import WriteComment from "../../components/WriteComment/WriteComment";
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import "./PostComments.css"

export default function PostComments({focusPost, comments, socket}) {

    return (
        <div className="postComments">
            <div className="postCommentsContainer">
                {<Post post={focusPost} socket={socket}/>}
                <WriteComment post={focusPost}/>
                { comments.map(c => (
                    <Comment key={c?.id} comment={c} />
                ))}
            </div>
        </div>
    )
}