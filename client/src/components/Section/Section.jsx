import "./Section.css";
import { AddCircle, IndeterminateCheckBox } from "@material-ui/icons"
import { useState, useEffect } from 'react'
import axios from "axios"
import PortfolioEntry from "../../components/PortfolioEntry/PortfolioEntry";
import AddArtwork from "../../components/AddArtwork/AddArtwork";

export default function Section({user, section}) {

    const [ hideState, setHideState ] = useState(true);
    const [ visibility, setVisibility ] = useState(false);
    const [ artworks, setArtworks ] = useState([]);

    let focus = hideState ? "sectionContainer" : "sectionContainerFocused";

    const handleClick = () => {
        setHideState(!hideState);
    }

    useEffect(() => {
            setArtworks(section?.artworks);
    }, [artworks]);

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
                    section?.artworks?.map((artworkId => 
                        <PortfolioEntry artworkId={artworkId}/>
                    ))
                }
                <button className="portfolioButton" onClick={() => {setVisibility(!visibility)}}>
                    Add Artwork
                </button>
                <AddArtwork user={user} visibility={visibility} setVisibility={setVisibility} section={section}/>
            </div>
        </div>
    )
}