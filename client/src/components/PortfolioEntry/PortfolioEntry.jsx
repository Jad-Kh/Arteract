import "./PortfolioEntry.css";

export default function PortfolioEntry() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="portfolioEntryContainer">
            <div className="portfolioEntryImage">
                <img  src={
                            /*user.coverPicture
                            ? PF + "backgrounds/" + user.coverPicture
                            : */ PF + "backgrounds/pic1.jpg"
                          } className="portfolioEntryImg" alt=""/>
                    
            </div>
            <span className="portfolioEntryType">Type</span>
            <div className="portfolioEntryInfo">
                <h3 className="portfolioEntryTitle">Title</h3>
                <div className="portfolioEntryPrice">14.99$ <span className="portfolioEntryDate"> 00/00/0000</span></div>
            </div>
        </div>
    )
}