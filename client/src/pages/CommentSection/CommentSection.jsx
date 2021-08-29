import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import PostComments from "../../components/PostComments/PostComments"
import Social from "../../components/Social/Social"
import "./CommentSection.css"

export default function CommentSection() {
    return (
        <div>
            <Navbar/>
            <div className="commentSectionContainer">
                <Sidebar/>
                <PostComments/>
                <Social/>
            </div>
        </div>
    )
}