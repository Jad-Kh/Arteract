import Post from "../../components/Post/Post"
import Share from "../../components/Share/Share"
import "./Activity.css"
import { Posts } from "../../trydata"

export default function Activity() {
    return (
        <div className="activity">
            <div className="activityContainer">
                <Share/>
                {Posts.map(p => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    )
}