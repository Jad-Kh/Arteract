import "./Sidebar.css"
import { RssFeed }
from "@material-ui/icons"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarContainer">
                <ul className="sidebarMenu">
                    <li className="sidebarMenuItem">
                        <RssFeed className="sidebarIcon"/>
                        <span>Feed</span>
                    </li>
                    <li className="sidebarMenuItem">
                        <RssFeed className="sidebarIcon"/>
                        <span>Feed</span>
                    </li>
                    <li className="sidebarMenuItem">
                        <RssFeed className="sidebarIcon"/>
                        <span>Feed</span>
                    </li>
                    <li className="sidebarMenuItem">
                        <RssFeed className="sidebarIcon"/>
                        <span>Feed</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}