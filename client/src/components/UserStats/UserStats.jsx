import "./UserStats.css"
import { useState, useEffect } from 'react'
import axios from "axios";

export default function UserStats() {

    const [ user, setUser ] = useState({});
    useEffect(() => {
        const fetchUser = async() => {
            const response = await axios.get(`users/612f91749c6548039c771b25`);
            setUser(response.data);
            console.log(user);
        }
        fetchUser();
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
                        <span className="userstatsStatText">Posts: 15</span>
                    </li>
                    <li className="userstatsStat">
                        <span className="userstatsStatText">{"Favorites: " + user.favorties.length}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}