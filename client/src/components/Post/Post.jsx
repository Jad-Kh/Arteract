import "./Post.css"
import { MoreVert, ThumbUp, ThumbDown, Favorite, ChatBubble } from "@material-ui/icons"
import { Users } from "../../trydata"

export default function Post({post}) {
     return (
         <div className="post">
             <div className="postContainer">
                 <div className="postTop">
                     <div className="postTopLeft">
                        <img className="postImg" src={ Users.filter((u) => u.id === post.userId)[0].pfp} alt=""/>
                        <span className="postUsername">
                            { Users.filter((u) => u.id === post.userId)[0].username}
                        </span>
                        <span className="postDate">{post?.date}</span>
                     </div> 
                     <div className="postTopRight">
                         <MoreVert htmlColor="lightgreen"/>
                     </div>
                 </div>
                 <div className="postCenter">
                     <span className="postText">{post?.desc}</span>
                     <img className="postContentImg" src={post?.photo} alt=""/>
                 </div>
                 <div className="postBottom">
                     <div className="postBottomLeft">
                        <ThumbUp htmlColor="lightgreen" className="postIcon"/> 
                        <span className="postLikeCounter">{post?.likes}</span>    
                        <ThumbDown htmlColor="lightgreen" className="postIcon"/>
                        <span className="postDislikeCounter">{post?.dislikes}</span> 
                        <Favorite htmlColor="lightgreen" className="postIcon"/>
                        <span className="postFavoriteCounter">{post?.favorites}</span>  
                     </div>
                     <div className="postBottomRight">
                         <span className="postCommentCounter">{post?.comments}</span>
                         <ChatBubble htmlColor="lightgreen" className="postIcon"/>
                     </div>
                 </div>
             </div>
         </div>
     )
 }