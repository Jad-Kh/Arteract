import "./Sidebar.css"
import { RssFeed, Person, PhotoLibrary, Portrait, Store, AttachMoney, Group, Chat, HelpOutline } from "@material-ui/icons"
import { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Sidebar() {

    const { user } = useContext(AuthContext);

    return (
        <div className="sidebar">
            <div className="sidebarContainer">
                <ul className="sidebarMenu">
                    <Link to={"/"} style={{ textDecoration: "none "}}>
                    <li className="sidebarMenuItem">
                        <RssFeed htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Activity</span>
                    </li>
                    </Link>
                    <Link to={`/profile/${user?.username}`} style={{ textDecoration: "none" }}>
                    <li className="sidebarMenuItem">
                        <Person htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Profile</span>
                    </li>
                    </Link>
                    <Link to={`/gallery/${user?.username}`} style={{ textDecoration: "none" }}>
                    <li className="sidebarMenuItem">
                        <PhotoLibrary htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Gallery</span>
                    </li>
                    </Link>
                    <Link to={`/portfolio/${user?.username}`} style={{ textDecoration: "none" }}>
                    <li className="sidebarMenuItem">
                        <Portrait htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Portfolio</span>
                    </li>
                    </Link>
                    <Link to={`/store`} style={{ textDecoration: "none" }}>
                    <li className="sidebarMenuItem">
                        <Store htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Store</span>
                    </li>
                    </Link>
                    <Link to={"/transactions"} style={{ textDecoration: "none" }}>
                    <li className="sidebarMenuItem">
                        <AttachMoney htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Transactions</span>
                    </li>
                    </Link>
                    <Link to={`/friends/${user?.username}`} style={{ textDecoration: "none" }}>
                    <li className="sidebarMenuItem">
                        <Group htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Friends</span>
                    </li>
                    </Link>
                    <Link to={"/chat"} style={{ textDecoration: "none" }}>
                    <li className="sidebarMenuItem">
                        <Chat htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Chat</span>
                    </li>
                    </Link>
                    <li className="sidebarMenuItem">
                        <HelpOutline htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>F.A.Q</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}