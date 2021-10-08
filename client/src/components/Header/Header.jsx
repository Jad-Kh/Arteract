import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./Header.css"

export default function Header({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const [ friended , setFriended ] = useState(false);
    const [ followed , setFollowed ] = useState(false);

    const handleFriend = async() => {
        try {
            if(friended) {
                await axios.put("/users/" + user._id + "/removefriend", { userId: currentUser._id });
            } else {
                await axios.put("/users/" + user._id + "/sendfriendrequest", { userId: currentUser._id });
            }
        } catch(error) {
            console.log(error)
        }
    }

    const handleFollow = async() => {
        try {
            if(followed) {
                await axios.put("/users/" + user._id + "/unfollow", { userId: currentUser._id });
            } else {
                await axios.put("/users/" + user._id + "/follow", { userId: currentUser._id });
            }
        } catch(error) {
            console.log(error);
        }
        setFollowed(!followed);
    }

    useEffect(() => {
        setFriended(currentUser.friends.includes(user?._id));
        setFollowed(currentUser.followins.includes(user?._id));
    }, [currentUser, user] );

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
                    <button className="headerButton" onClick={handleFriend}>
                        { user._id === currentUser._id 
                        ? "Edit" 
                        : (currentUser.friends).includes(user._id) 
                            ? "Unfriend"
                            : "Add Friend" 
                        }
                    </button>
                        { user._id === currentUser._id 
                        ? "" 
                        : <button className="headerButton" onClick={handleFollow}> 
                            { (currentUser.followins).includes(user._id)
                            ? "Unfollow"
                            : "Follow"    
                            }  
                          </button> 
                        }  
               </div>
                <div className="headerBottom">
                    <h4 className="headerName">{user.username}</h4>
                    <span className="headerDesc">Hello, hope you're doing well!</span>
                </div>  
            </div>
        </div>
    )
}