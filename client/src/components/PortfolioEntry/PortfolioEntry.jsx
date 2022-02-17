import "./PortfolioEntry.css";

export default function PortfolioEntry({artwork}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
                    <span className="portfolioEntryDate"> {artwork?.createdAt}</span>
                </div>
            </div>
        </div>
    )
}