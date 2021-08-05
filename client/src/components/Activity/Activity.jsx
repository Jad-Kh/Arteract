import Post from "../../components/Post/Post"
import Share from "../../components/Share/Share"
import "./Activity.css"

export default function Activity() {
    return (
        <div className="activity">
            <div className="activityContainer">
                <Share/>
                <Post/>
            </div>
        </div>
    )
}