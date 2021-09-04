import { useState, useEffect } from 'react'
import "./Post.css"
import { Users } from "../../trydata"
import { MoreVert, ThumbUp, ThumbDown, Favorite, ChatBubble } from "@material-ui/icons"
import axios from "axios";

export default function Post({post}) {

    const [like, setLike] = useState(post.likes.length);
    const [dislike, setDislike] = useState(post.dislikes.length);
    const [favorite, setFavorite] = useState(post.favorites.length);

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleLike = () => {
        setLike(isLiked ? like-1 : like+1);
        setDislike(isDisliked ? dislike-1 : dislike);
        setIsLiked(!isLiked);
        setIsDisliked(isDisliked ? !isDisliked : isDisliked);
    }

    const handleDislike = () => {
        setDislike(isDisliked ? dislike-1 : dislike+1);
        setLike(isLiked ? like-1 : like);
        setIsDisliked(!isDisliked);
        setIsLiked(isLiked ? !isLiked : isLiked);
    }

    const handleFavorite = () => {
        setFavorite(isFavorited ? favorite-1 : favorite+1);
        setDislike(isDisliked ? dislike-1 : dislike);
        setIsFavorited(!isFavorited);
        setIsDisliked(isDisliked ? !isDisliked : isDisliked);
    }

    const [ user, setUser ] = useState({});
    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get(`users/${post.userId}`);
            setUser(response.data);
        }
        fetchUser();
    },[])

     return (
         <div className="post">
             <div className="postContainer">
                 <div className="postTop">
                     <div className="postTopLeft">
                        <img className="postImg" src={"assets/avatars/" + user.profilePicture || "assets/avatars/default.jpg"} alt=""/>
                        <span className="postUsername">
                            {user.username}
                        </span>
                        <span className="postDate">{post.createdAt}</span>
                     </div> 
                     <div className="postTopRight">
                         <MoreVert htmlColor="lightgreen"/>
                     </div>
                 </div>
                 <div className="postCenter">
                     <span className="postText">{post.description}</span>
                     <img className="postContentImg" src={"assets/posts/" + post.image} alt=""/>
                 </div>
                 <div className="postBottom">
                     <div className="postBottomLeft">
                        <ThumbUp htmlColor="lightgreen" className="postIcon" onClick={handleLike}/> 
                        <span className="postLikeCounter">{like}</span>    
                        <ThumbDown htmlColor="lightgreen" className="postIcon" onClick={handleDislike}/>
                        <span className="postDislikeCounter">{dislike}</span> 
                        <Favorite htmlColor="lightgreen" className="postIcon" onClick={handleFavorite}/>
                        <span className="postFavoriteCounter">{favorite}</span>  
                     </div>
                     <div className="postBottomRight">
                         <span className="postCommentCounter">{post.comments.length}</span>
                         <ChatBubble htmlColor="lightgreen" className="postIcon"/>
                     </div>
                 </div>
             </div>
         </div>
     )
 }