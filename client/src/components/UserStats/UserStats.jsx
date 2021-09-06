import "./UserStats.css"
import { useState, useEffect } from 'react'
import axios from "axios";

export default function UserStats() {

    const [ posts, setPosts ] = useState({});
    useEffect(() => {
        const fetchPosts = async() => {
            const response = await axios.get(`posts/posts/612f91749c6548039c771b25`);
            setPosts(response.data);
        }
        fetchPosts();
    }, [])

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