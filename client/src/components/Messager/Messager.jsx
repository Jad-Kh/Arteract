import "./Messager.css";
import Message from "../Message/Message";

export default function Messager() {
    return (
        <div className="messagerContainer">
            <div className="messagerInsider">
                <div className="messagerInsiderTop">
                    <Message own={true}/>
                    <Message own={false}/>
                    <Message own={true}/>
                </div>
                <div className="messagerInsiderBottom">
                    <textarea className="messagerInput"
                              placeholder="write something...">
                    </textarea>
                    <button className="messagerInputButton">
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}