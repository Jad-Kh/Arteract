import "./Message.css";

export default function Message({own}) {
    return (
        <div className={
                        own ? "messageContainer    " 
                            : "messageContainer own"
                       }>
            <div className="messageInsider">
                <img className="messageImage" src="" alt=""/>
                <p className="messageText">Hello this is a message</p>
            </div>
            <div className="messageTimer">1 hour ago</div>
        </div>
    )
}