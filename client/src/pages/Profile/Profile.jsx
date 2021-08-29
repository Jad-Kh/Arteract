import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "../../components/Header/Header"
import Share from "../../components/Share/Share"
import Post from "../../components/Post/Post"
import Friends from "../../components/Friends/Friends"
import UserStats from "../../components/UserStats/UserStats"
import "./Profile.css"
import { Posts } from "../../trydata"

export default function Profile() {
    return (
        <div>
            <Navbar/>
            <div className="profileContainer">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <Header/>
                    </div>
                    <div className="profileRightBottom">
                        <div className="profileRightBottomLeft">
                            <Share/>
                            {Posts.filter((post) => post.userId === 1992).map(p => (
                                <Post key={p.id} post={p} />
                            ))}
                        </div>
                        <div className="profileRightBottomRight">
                            <UserStats/>
                            <Friends/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}