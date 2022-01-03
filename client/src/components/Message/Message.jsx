import "./Message.css";
import {format} from "timeago.js"

export default function Message({message, own}) {
    return (
        <div className={
                        own ? "messageContainer    " 
                            : "messageContainer own"
                       }>
            <div className="messageInsider">
                <img className="messageImage" src="" alt=""/>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageTimer">{format(message.createdAt)}</div>
        </div>
    )
}