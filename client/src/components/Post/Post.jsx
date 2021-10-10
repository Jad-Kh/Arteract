import { useState, useEffect, useContext } from 'react'
import "./Post.css"
import { MoreVert, ThumbUp, ThumbDown, Favorite, ChatBubble } from "@material-ui/icons"
import axios from "axios";
import { format } from "timeago.js"
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {

    const { user: currentUser } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [like, setLike] = useState(post.likes.length);
    const [dislike, setDislike] = useState(post.dislikes.length);
    const [favorite, setFavorite] = useState(post.favorites.length);

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleLike = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch(error) {
            console.log(error);
        }
        setLike(isLiked ? like-1 : like+1);
        setDislike(isDisliked ? dislike-1 : dislike);
        setIsLiked(!isLiked);
        setIsDisliked(isDisliked ? !isDisliked : isDisliked);
    }

    const handleDislike = () => {
        try {
            axios.put("/posts/" + post._id + "/dislike", { userId: currentUser._id });
        } catch(error) {
            console.log(error);
        }
        setDislike(isDisliked ? dislike-1 : dislike+1);
        setLike(isLiked ? like-1 : like);
        setIsDisliked(!isDisliked);
        setIsLiked(isLiked ? !isLiked : isLiked);
    }

    const handleFavorite = () => {
        try {
            axios.put("/posts/" + post._id + "/favorite", { userId: currentUser._id });
        } catch(error) {
            console.log(error);
        }
        setFavorite(isFavorited ? favorite-1 : favorite+1);
        setDislike(isDisliked ? dislike-1 : dislike);
        setIsFavorited(!isFavorited);
        setIsDisliked(isDisliked ? !isDisliked : isDisliked);
    }

    const [ user, setUser ] = useState({});
    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get(`/users/${post.userId}`);
            setUser(response.data);
        }
        setIsLiked(post.likes.includes(currentUser._id));
        setIsDisliked(post.likes.includes(currentUser._id));
        setIsFavorited(post.likes.includes(currentUser._id));
        fetchUser();
    }, [user, post.userId, currentUser._id])

     return (
         <div className="post">
             <div className="postContainer">
                 <div className="postTop">
                     <div className="postTopLeft">
                        <img className="postImg" src={user.profilePicture 
                                                        ? PF + "avatars/" + user.profilePicture 
                                                        : PF + "avatars/default.jpg"
                                                     } alt=""/>
                        <span className="postUsername">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                     </div> 
                     <div className="postTopRight">
                         <div className="postDropdown">
                         <MoreVert htmlColor="lightgreen"/>
                         { user._id === currentUser._id &&  
                            <div className="postDropdownContent">
                                <p>Edit</p>
                                <p>Delete</p>
                            </div>
                         }
                         </div>
                     </div>
                 </div>
                 <div className="postCenter">
                     <span className="postText">{post.description}</span>
                     <img className="postContentImg" src={PF + post.image} alt=""/>
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