import "./Navbar.css"
import { Search, Person, Chat, Notifications }  from "@material-ui/icons"
import { Users } from "../../trydata"

export default function Navbar() {
    return (
        <div className="navbarContainer">
            <div className="navbarLeft">
                <span className="navbarLogo">Arteract</span>
            </div>
            <div className="navbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search..." className="searchInput"/>
                </div>    
            </div>
            <div className="navbarRight">
                <div className="navbarLinks">
                    <span className="navbarLink">Mainpage</span>
                    <span className="navbarLink">Logout</span>
                </div>
                <div className="navbarIcons">
                    <div className="navbarIconItem">
                        <Person/>
                        <span className="navbarIconBadge">1</span>
                    </div>
                    <div className="navbarIconItem">
                        <Chat/>
                        <span className="navbarIconBadge">1</span>
                    </div>
                    <div className="navbarIconItem">
                        <Notifications/>
                        <span className="navbarIconBadge">1</span>
                    </div>
                </div>
                <img src={ Users.filter((u) => u.id === 1992)[0].pfp } alt="" className="navbarImg"/>
            </div>
        </div>
    );
}