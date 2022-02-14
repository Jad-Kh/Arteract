import "./Section.css";
import { AddCircle, IndeterminateCheckBox } from "@material-ui/icons"
import { useState } from 'react'
import PortfolioEntry from "../../components/PortfolioEntry/PortfolioEntry";

export default function Section() {

    const [ hideState, setHideState ] = useState(true);

    let focus = hideState ? "sectionContainer" : "sectionContainerFocused";

    const handleClick = () => {
        setHideState(!hideState);
    }

    return (
        <div className="section">
            <div className="sectionTop">
                <h1 className="sectionTitle">Section Title</h1>
                <div className="sectionButton" onClick={handleClick}>{
                                                                        hideState 
                                                                        ? <AddCircle/>
                                                                        : <IndeterminateCheckBox/>
                                                                     }</div>
            </div>
            <div className={focus}>
                <PortfolioEntry/>
                <PortfolioEntry/>
                <PortfolioEntry/>
                <PortfolioEntry/>
                <PortfolioEntry/>
                <PortfolioEntry/>
                <PortfolioEntry/>
                <PortfolioEntry/>
                <PortfolioEntry/>
                <PortfolioEntry/>
            </div>
        </div>
    )
}