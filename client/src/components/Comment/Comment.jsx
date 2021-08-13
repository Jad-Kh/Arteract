import "./Comment.css"
import { MoreVert } from "@material-ui/icons"
import { Users } from "../../trydata"

export default function Comment({comment}) {
    return (
        <div className="comment">
            <div className="commentContainer">
                <div className="commentTop">
                    <div className="commentTopLeft">
                        <img className="commentImg" src={ Users.filter((u) => u.id === comment.userId)[0].pfp} alt=""/>
                        <span className="commentUsername">
                            { Users.filter((u) => u.id === comment.userId)[0].username}
                        </span>
                        <span className="commentDate">{comment?.date}</span>
                     </div> 
                     <div className="commentTopRight">
                         <MoreVert htmlColor="lightgreen"/>
                     </div>
                </div>
            </div>
            <div className="commentContent">
                     <span className="commentText">{comment?.desc}</span>
                 </div>
        </div>
    )
}