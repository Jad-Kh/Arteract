import { MonetizationOn, ArtTrack, Accessibility } from "@material-ui/icons";
import "./InfoBoxes.css"

export default function InfoBoxes() {
    return (
        <div className="infoboxes">
            <div className="infobox">
                <span className="infoboxTitle">Revenue</span>
                <div className="infoboxNumberContainer">
                    <span className="infoboxNumber">$500</span>
                    <MonetizationOn className="infoboxIcon"/>
                </div>
                <span className="infoboxSmall">End results from all transactions</span>
            </div>
            <div className="infobox">
                <span className="infoboxTitle">Products</span>
                <div className="infoboxNumberContainer">
                    <span className="infoboxNumber">13</span>
                    <ArtTrack className="infoboxIcon"/>
                </div>
                <span className="infoboxSmall">Includes free ones and giveaways</span>
            </div>
            <div className="infobox">
                <span className="infoboxTitle">Customers</span>
                <div className="infoboxNumberContainer">
                    <span className="infoboxNumber">10</span>
                    <Accessibility className="infoboxIcon"/>
                </div>
                <span className="infoboxSmall">Hopefully they are satisfied</span>
            </div>          
        </div>
    )
}