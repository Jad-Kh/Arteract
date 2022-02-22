import { useEffect } from "react";
import axios from "axios";
import "./PortfolioEntry.css";
import { useState } from "react";
import { format } from "timeago.js"

export default function PortfolioEntry({artworkId}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ artwork, setArtwork ] = useState();

    useEffect(() => {
        const fetchArtwork = async() => {
            const response = await axios.get("/artworks/" + artworkId)
            setArtwork(response.data)
        }
        fetchArtwork();
    }, [artworkId])

    return (
        <div className="portfolioEntryContainer">
            <div className="portfolioEntryImage">
                <img src={
                            PF + "artworks/" + artwork?.picture 
                         } className="portfolioEntryImg" alt=""/>
                    
            </div>
            <span className="portfolioEntryType">{artwork?.status}</span>
            <div className="portfolioEntryInfo">
                <h3 className="portfolioEntryTitle">{artwork?.title}</h3>
                <div className="portfolioEntryPrice">{artwork?.price - 0.01}$ 
                    <span className="portfolioEntryDate"> {format(artwork?.createdAt)}</span>
                </div>
            </div>
        </div>
    )
}