import "./Portfolio.css";
import Navbar from "../../components/Navbar/Navbar";
import Section from "../../components/Section/Section";
import Sidebar from "../../components/Sidebar/Sidebar";
import PortfolioStart from "../../components/PortfolioStart/PortfolioStart"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { useParams } from "react-router";

export default function Portfolio() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const [ artist, setArtist ] = useState({});
    const [ portfolio, setPortfolio ] = useState({});
    const [ sections, setSections ] = useState([]);
    const [ visibility, setVisibility ] = useState(false);
    const username = useParams().username;

    useEffect(() => {
        const fetchArtist = async() => {
            const response = await axios.get("/users/user/" + username);
            setArtist(response.data);
        }
        fetchArtist();
    }, [username]);

    useEffect(() => {
        const fetchPortfolio = async() => {
            const response = await axios.get("/portfolios/" + artist?._id);
            setPortfolio(response.data);
        }
        fetchPortfolio();
    }, [artist, username, user]);

    useEffect(() => {
        const fetchSections = async() => {
            const response = await axios.get("/sections/portfolio/" + portfolio?._id);
            setSections(response.data);
        }
        fetchSections();
    }, [portfolio, sections]);

    return (
        <div className="portfolio">
            <Navbar/>
            <div className="portfolioContainer">
                <Sidebar/>
                { console.log(artist),
                console.log(portfolio),
                portfolio._id  
                ? 
                <div className="portfolioRight">
                    <div className="portfolioTop">
                        <img className="portfolioTopCover" src={
                                                                    portfolio?.coverPicture
                                                                    ? PF + "backgrounds/" + portfolio?.coverPicture
                                                                    : PF + "backgrounds/pic2.jpg"
                                                               } alt=""/>
                        <h1 className="portfolioHeading">{`Portfolio of ${artist?.username}`}</h1>
                        <div className="portfolioInfo">
                            <span className="portfolioInfoSpan">Level: {portfolio?.level}</span>
                            <span className="portfolioInfoSpan">Type: { portfolio?.types ?
                                portfolio?.types.map((type) => 
                                <span>{type + ", "}</span>)
                            : ""}
                            </span>
                            <span className="portfolioInfoSpan">Subjects: { portfolio?.subjects ?
                                portfolio?.subjects.map((subject) => 
                                <span>{subject + ", "}</span>)
                            : ""}
                            </span>
                        </div>
                        {
                            user?._id === artist?._id 
                            ? <div>
                                <button className="portfolioButton">Add Section</button>
                                <button className="portfolioButton">Add Artwork</button>
                              </div>
                            : 
                                <button className="portfolioButton">Browse Store</button>                         
                        }
                    </div>
                    {
                        sections.map((section) => {
                            <Section section={section}/>
                        })
                    }
                </div>
                :
                    <div className="portfolioRight">
                        <div className="portfolioTop">
                            <button className="portfolioButton" onClick={() => {setVisibility(!visibility)}}>
                                Start Portfolio
                            </button>
                            <PortfolioStart user={artist} visibility={visibility} setVsibility={setVisibility}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}