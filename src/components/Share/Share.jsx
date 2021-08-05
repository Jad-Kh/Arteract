import "./Share.css"
import { PermMedia, Label, EmojiEmotions } from "@material-ui/icons"

export default function Share() {
    return (
        <div className="share">
            <div className="shareContainer">
                <div className="shareTop">
                    <img className="shareImg" src="" alt="" />
                    <input className="shareInput" placeholder="What's on your mind [username]?"/>
                </div>
                <hr className="shareLine"></hr>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOptionsItem">
                            <PermMedia htmlColor="lightgreen" className="shareIcon"/>
                            <span>Art Content</span>
                        </div>
                        <div className="shareOptionsItem">
                            <Label htmlColor="lightgreen" className="shareIcon"/>
                            <span>Tag</span>
                        </div>
                        <div className="shareOptionsItem">
                            <EmojiEmotions htmlColor="lightgreen" className="shareIcon"/>
                            <span>Emojies</span>
                        </div>
                    </div>
                    <button className="shareButton">Post</button>
                </div>
            </div> 
        </div>
    )
}