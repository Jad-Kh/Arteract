import "./Chatlist.css";
import Conversation from "../Conversation/Conversation";

export default function Chatlist() {
    return (
        <div className="chatlistContainer">
            <div className="chatlistInsider">
                <input placeholder="Search for friends" className="chatlistInput"/>
                <Conversation/>
                <Conversation/>
                <Conversation/>
                <Conversation/>
            </div>
        </div>
    )
}