import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import GalleryEntry from "../../components/GalleryEntry/GalleryEntry"
import "./Gallery.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Gallery() {

    const [ galleryUser, setGalleryUser ] = useState();
    const [ posts, setPosts ] = useState([]);
    const [ favorites, setFavorites ] = useState([]);
    const username = useParams().username;

    useEffect(() => {
        const fetchGalleryUser = async() => {
            const response = await axios.get("/users/user/" + username);
            setGalleryUser(response.data);
        };   
        fetchGalleryUser();
    }, [username])

    useEffect(() => {
        const fetchPosts = async() => {
            const response = await axios.get("/posts/profile/" + galleryUser?._id);
            response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
            setPosts(response.data);
        }
        const fetchFavorites = async() => {
            const response = await axios.get("/posts/favorites/" + galleryUser?._id);
            response.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
            setFavorites(response.data);
        }
        fetchPosts();
        fetchFavorites();
    }, [galleryUser?._id, posts, favorites])

    return (
        <div>
            <Navbar/>
            <div className="galleryContainer">
                <Sidebar/>
                <div className="galleryRight">
                    <div className="galleryRightLeft">
                        {posts.map(p => ( 
                            <GalleryEntry key={p._id} post={p} /> 
                        )) } 
                    </div>
                    <div className="galleryRightRight">
                        {favorites.map(p => ( 
                            <GalleryEntry key={p._id} post={p} /> 
                        )) } 
                    </div>
                </div>
            </div>
        </div>
    )
}