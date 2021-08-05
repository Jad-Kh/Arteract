import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Activity from "../../components/Activity/Activity"
import Social from "../../components/Social/Social"
import "./Home.css"

export default function Home() {
    return (
        <div>
            <Navbar/>
            <div className="homeContainer">
                <Sidebar/>
                <Activity/>
                <Social/>
            </div>
        </div>
    )
}