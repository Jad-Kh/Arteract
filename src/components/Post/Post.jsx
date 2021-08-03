import "./Post.css"
import { MoreVert, ThumbUp, ThumbDown, Favorite, ChatBubble } from "@material-ui/icons"

 export default function Post() {
     return (
         <div className="post">
             <div className="postContainer">
                 <div className="postTop">
                     <div className="postTopLeft">
                        <img className="postImg" src="" alt=""/>
                        <span className="postUsername">User</span>
                        <span className="postDate">5 minutes ago</span>
                     </div> 
                     <div className="postTopRight">
                         <MoreVert/>
                     </div>
                 </div>
                 <div className="postCenter">
                     <span className="postText">Hey, It's a post</span>
                     <img className="postContentImg" src="" alt=""/>
                 </div>
                 <div className="postBottom">
                     <div className="postBottomLeft">
                        <ThumbUp className="postIcon"/> 
                        <span className="postLikeCounter">10</span>    
                        <ThumbDown className="postIcon"/>
                        <span className="postDislikeCounter">5</span> 
                        <Favorite className="postIcon"/>
                        <span className="postFavoriteCounter">2</span>  
                     </div>
                     <div className="postBottomRight">
                         <span className="postCommentCounter">8</span>
                         <ChatBubble className="postIcon"/>
                     </div>
                 </div>
             </div>
         </div>
     )
 }