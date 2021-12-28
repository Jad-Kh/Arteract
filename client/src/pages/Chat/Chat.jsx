import "./Chat.css";
import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Messager from "../../components/Messager/Messager"
import Chatlist from "../../components/Chatlist/Chatlist"

export default function Chat() {
    return (
        <div>
            <Navbar/>
            <div className="chatContainer">
                <Sidebar/>
                <Messager/>
                <Chatlist/>
            </div>
        </div>
    )
}