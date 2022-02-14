import "./Portfolio.css";
import Navbar from "../../components/Navbar/Navbar";
import Section from "../../components/Section/Section";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Portfolio() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="portfolio">
            <Navbar/>
            <div className="portfolioContainer">
                <Sidebar/>
                <div className="portfolioRight">
                    <div className="portfolioTop">
                        <img className="portfolioTopCover" src={/*
                                                                    user.coverPicture
                                                                    ? PF + "backgrounds/" + user.coverPicture
                                                                    : */PF + "backgrounds/pic2.jpg"
                                                               } alt=""/>
                        <h1 className="portfolioHeading">Katelynn's Portfolio</h1>
                        <button className="portfolioButton">Add Section</button>
                    </div>
                    <Section/>
                    <Section/>
                </div>
            </div>
        </div>
    )
}