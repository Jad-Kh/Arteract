import "./Sidebar.css"
import { RssFeed, Person, PhotoLibrary, Portrait, AttachMoney, Group, HelpOutline }
from "@material-ui/icons"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarContainer">
                <ul className="sidebarMenu">
                    <li className="sidebarMenuItem">
                        <RssFeed htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Activity</span>
                    </li>
                    <li className="sidebarMenuItem">
                        <Person htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>Profile</span>
                    </li>
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
                        <HelpOutline htmlColor="#1877f2" className="sidebarIcon"/>
                        <span>F.A.Q</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}