import Post from "../../components/Post/Post"
import Comment from "../../components/Comment/Comment"
import WriteComment from "../../components/WriteComment/WriteComment";
import "./PostComments.css"
import { Posts, Comments } from "../../trydata"

export default function PostComments() {
    return (
        <div className="postComments">
            <div className="postCommentsContainer">
                { Posts.filter((p) => p.id === 23364).map(p => (
                    <Post key={p.id} post={p} />
                ))}
                <WriteComment />
                { Comments.filter((c) => c.postId === 23364).map(c => (
                    <Comment key={c.id} comment={c} />
                ))}
            </div>
        </div>
    )
}