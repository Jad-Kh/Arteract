import "./Header.css"

export default function Header() {
    return (
        <div className="header">
            <div className="headerContainer">
                <div className="headerTop">
                    <img className="headerCoverImg" src="assets/backgrounds/pic2.jpg" alt=""/>
                    <img className="headerProfileImg" src="assets/avatars/pic1.jpg" alt=""/>
                    <button className="headerButton">Add Friend</button>
                    <button className="headerButton">Follow    </button>
                </div>
                <div className="headerBottom">
                    <h4 className="headerName">Alexandra Rivera</h4>
                    <span className="headerDesc">Hello, hope you're doing well!</span>
                </div>  
            </div>
        </div>
    )
}