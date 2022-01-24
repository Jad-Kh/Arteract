import { useState, useEffect, useContext } from 'react'
import "./Post.css"
import { MoreVert, ThumbUp, ThumbDown, Favorite, ChatBubble } from "@material-ui/icons"
import axios from "axios";
import { Link } from "react-router-dom"
import { format } from "timeago.js"
import { AuthContext } from '../../context/AuthContext';

export default function Post({post, socket}) {

    const { user: currentUser } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ user, setUser ] = useState({});

    const [like, setLike] = useState(post?.likes.length);
    const [dislike, setDislike] = useState(post?.dislikes.length);
    const [favorite, setFavorite] = useState(post?.favorites.length);

    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleNotification = (type) => {

        const receiverId = user._id;

        socket.current?.emit("sendNotification", {
            senderId: currentUser?.username,
            receiverId,
            type,
        });

    };

    const handleLike = () => {
        try {
            axios.put("/posts/" + post?._id + "/like", { userId: currentUser?._id });
        } catch(error) {
            console.log(error);
        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
        handleNotification(1);
    }

    const handleDislike = () => {
        try {
            axios.put("/posts/" + post?._id + "/dislike", { userId: currentUser?._id });
        } catch(error) {
            console.log(error);
        }
        setDislike(isDisliked ? dislike-1 : dislike+1);
        setIsDisliked(!isDisliked);
        handleNotification(2);
    }

    const handleFavorite = () => {
        try {
            axios.put("/posts/" + post?._id + "/favorite", { userId: currentUser?._id });
        } catch(error) {
            console.log(error);
        }
        setFavorite(isFavorited ? favorite-1 : favorite+1);
        setIsFavorited(!isFavorited);
        handleNotification(3);
    }
    
    useEffect(() => {
        setIsLiked(post?.likes.includes(currentUser?._id));
    }, [currentUser?._id, post?.likes]);

    useEffect(() => {
        setIsDisliked(post?.dislikes.includes(currentUser?._id));
    }, [currentUser?._id, post?.dislikes]);

    useEffect(() => {
        setIsFavorited(post?.favorites.includes(currentUser?._id));
    }, [currentUser?._id, post?.favorites]);

    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get(`/users/${post?.userId}`);
            setUser(response.data);
        }
        fetchUser();
    }, [post?.userId]);

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
                        <span className="postDate">{format(post?.createdAt)}</span>
                     </div> 
                     <div className="postTopRight">
                         <div className="postDropdown">
                         <MoreVert htmlColor="lightgreen"/>
                         { user._id === currentUser?._id &&  
                            <div className="postDropdownContent">
                                <p>Edit</p>
                                <p>Delete</p>
                            </div>
                         }
                         </div>
                     </div>
                 </div>
                 <div className="postCenter">
                     <span className="postText">{post?.description}</span>
                     <img className="postContentImg" src={PF + "posts/" + post?.image} alt=""/>
                 </div>
                 <div className="postBottom">
                     <div className="postBottomLeft">
                        <ThumbUp htmlColor="lightgreen" className="postIcon" 
                        onClick={handleLike}/>
                        <span className="postLikeCounter">{like}</span>    
                        <ThumbDown htmlColor="lightgreen" className="postIcon"
                        onClick={handleDislike}/>
                        <span className="postDislikeCounter">{dislike}</span> 
                        <Favorite htmlColor="lightgreen" className="postIcon"
                        onClick={handleFavorite}/>
                        <span className="postFavoriteCounter">{favorite}</span>  
                     </div>
                     <div className="postBottomRight">
                         <span className="postCommentCounter">{post?.comments.length}</span>
                         <Link to={`/postInfo/${post?._id}`} style={{ textDecoration: "none" }}>
                            <ChatBubble htmlColor="lightgreen" className="postIcon"/>
                         </Link>
                     </div>
                 </div>
             </div>
         </div>
     )
 }