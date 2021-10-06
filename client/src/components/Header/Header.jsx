import "./Header.css"

export default function Header({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="header">
            <div className="headerContainer">
                <div className="headerTop">
                    <img className="headerCoverImg" src={
                                                            user.coverPicture
                                                            ? PF + "backgrounds/" + user.coverPicture
                                                            : PF + "backgrounds/default.jpg"
                                                        } alt=""/>
                    <img className="headerProfileImg" src={
                                                            user.profilePicture
                                                            ? PF + "avatars/" + user.profilePicture
                                                            : PF + "avatars/default.jpg"
                                                          } alt=""/>
                    <button className="headerButton">Add Friend</button>
                    <button className="headerButton">Follow    </button>
                </div>
                <div className="headerBottom">
                    <h4 className="headerName">{user.username}</h4>
                    <span className="headerDesc">Hello, hope you're doing well!</span>
                </div>  
            </div>
        </div>
    )
}