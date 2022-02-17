import "./Section.css";
import { AddCircle, IndeterminateCheckBox } from "@material-ui/icons"
import { useState, useEffect } from 'react'
import axios from "axios"
import PortfolioEntry from "../../components/PortfolioEntry/PortfolioEntry";

export default function Section({section}) {

    const [ hideState, setHideState ] = useState(true);
    const [ artworks, setArtworks ] = useState([]);

    let focus = hideState ? "sectionContainer" : "sectionContainerFocused";

    const handleClick = () => {
        setHideState(!hideState);
    }

    useEffect(() => {
        const fetchArtworks = async() => {
            const response = await axios.get("/artworks/section" + section?._id);
            setArtworks(response.data);
        }
        fetchArtworks();
    }, [artworks, section]);

    return (
        <div className="section">
            <div className="sectionTop">
                <h1 className="sectionTitle">{section?.title}</h1>
                <div className="sectionButton" onClick={handleClick}>{
                                                                        hideState 
                                                                        ? <AddCircle/>
                                                                        : <IndeterminateCheckBox/>
                                                                     }</div>
            </div>
            <div className={focus}>
                {
                    artworks.map((artwork => {
                        <PortfolioEntry artwork={artwork}/>
                    }))
                }
            </div>
        </div>
    )
}