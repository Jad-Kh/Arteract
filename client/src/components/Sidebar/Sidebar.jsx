import "./Sidebar.css"
import { RssFeed, Person, PhotoLibrary, Portrait, AttachMoney, Group, Chat, HelpOutline } from "@material-ui/icons"
import { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Sidebar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="sidebar">
            <div className="sidebarContainer">
                <ul className="sidebarMenu">
                    <li className="sidebarMenuItem">
                        <RssFeed htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Activity</span>
                    </li>
                    <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
                    <li className="sidebarMenuItem">
                        <Person htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Profile</span>
                    </li>
                    </Link>
                    <li className="sidebarMenuItem">
                        <PhotoLibrary htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Gallery</span>
                    </li>
                    <li className="sidebarMenuItem">
                        <Portrait htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Portfolio</span>
                    </li>
                    <li className="sidebarMenuItem">
                        <AttachMoney htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Transactions</span>
                    </li>
                    <li className="sidebarMenuItem">
                        <Group htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Friends</span>
                    </li>
                    <li className="sidebarMenuItem">
                        <Chat htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Chat</span>
                    </li>
                    <li className="sidebarMenuItem">
                        <HelpOutline htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>F.A.Q</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}