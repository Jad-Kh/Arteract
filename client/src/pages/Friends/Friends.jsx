import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Friendslist from "../../components/Friendslist/Friendslist"
import Followers from "../../components/Followers/Followers"
import Requests from "../../components/Requests/Requests"
import "./Friends.css"

export default function Friends() {
    return (
        <div>
            <Navbar/>
            <div className="friends">
                <Sidebar/>
                <Friendslist/>
                <div className="friendsFollowers">
                    <Followers/>
                    <Requests/>
                </div>
            </div>
        </div>
    )
}