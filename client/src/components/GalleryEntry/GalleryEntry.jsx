import { useState, useEffect, useContext } from 'react'
import "./GalleryEntry.css"
import { MoreVert } from "@material-ui/icons"
import axios from "axios";
import { Link } from "react-router-dom"
import { format } from "timeago.js"
import { AuthContext } from '../../context/AuthContext';

export default function GalleryEdit({post}) {

    const { user: currentUser } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ user, setUser ] = useState({});

    const handleDelete = () => {
        try {
            axios.delete("/posts/" + post?._id, { data: { userId: post?.userId }});
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get(`/users/${post?.userId}`);
            setUser(response.data);
        }
        fetchUser();
    }, [post?.userId]);

     return (
         <div className="galleryEntry">
             <div className="galleryEntryContainer">
                 <div className="galleryEntryTop">
                     <div className="galleryEntryTopLeft">
                        <Link to={`/profile/${user?.username}`} style={{ textDecoration: "none" }}>
                            <img className="galleryEntryImg" src={user.profilePicture 
                                                            ? PF + "avatars/" + user.profilePicture 
                                                            : PF + "avatars/default.jpg"
                                                        } alt=""/>
                        </Link>
                     </div> 
                     <div className="galleryEntryTopRight">
                         <div className="galleryEntryDropdown">
                         <MoreVert htmlColor="lightgreen"/>
                         { user._id === currentUser?._id &&  
                            <div className="galleryEntryDropdownContent">
                                <Link to={`/editPost/${post?._id}`} style={{ textDecoration: "none" }}>
                                    <div className="galleryEntryDropdownButton">Edit</div>
                                </Link>
                                <div className="galleryEntryDropdownButton" onClick={handleDelete}>Delete</div>
                            </div>
                         }
                         </div>
                     </div>
                 </div>
                 <div className="galleryEntryCenter">
                     <span className="galleryEntryText">{post?.description}</span>
                     <img className="galleryEntryContentImg" src={PF + "posts/" + post?.image} alt=""/>
                 </div>
             </div>
         </div>
     )
 }