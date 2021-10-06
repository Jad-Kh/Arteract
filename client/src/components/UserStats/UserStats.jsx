import "./UserStats.css"
import { useState, useEffect } from 'react'
import axios from "axios";

export default function UserStats({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [ posts, setPosts ] = useState({});
    useEffect(() => {
        const fetchPosts = async() => {
            const response = await axios.get("/posts/profile/" + user._id);
            setPosts(response.data);
        };     
        fetchPosts();
    }, [user])

    return (
        <div className="userstats">
            <div className="userstatsContainer">
                <ul className="userstatsList">
                    <li className="userstatsStat">
                        <span className="userstatsStatText">Exchanges: 10</span>
                    </li>
                    <li className="userstatsStat">
                        <span className="userstatsStatText">Uploads: 6</span>
                    </li>
                    <li className="userstatsStat">
                        <span className="userstatsStatText">{"Posts: " + posts.length}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}