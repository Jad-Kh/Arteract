import "./EditCard.css"

export default function EditCard({user, visibility}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    let visibilityClass = visibility ? "editCard" : "editCardHidden";

    return (
        <div className={visibilityClass}>
            <div className="editCardContainer">
                <div className="editCardUpper">
                    <input type="file" id="coverfile" accept=".png,.jpeg,.jpg,.gif" style={{ display: "none" }}/>
                    <input type="file" id="profilefile" accept=".png,.jpeg,.jpg,.gif" style={{ display: "none" }}/>
                    <label htmlFor="coverfile">
                        <img className="editCardCoverImg" src={
                                                                user?.coverPicture
                                                                ? PF + "backgrounds/" + user?.coverPicture
                                                                : PF + "backgrounds/default.jpg"
                                                            } alt=""/>
                    </label>
                    <label htmlFor="profilefile">
                        <img className="editCardProfileImg" src={
                                                                user?.profilePicture
                                                                ? PF + "avatars/" + user?.profilePicture
                                                                : PF + "avatars/default.jpg"
                                                            } alt=""/>
                    </label>
                </div>
                <div className="editCardLower">
                    <input className="editCardName" placeholder={user?.username}/>
                    <textarea className="editCardDesc" placeholder={"Hello, hope you're doing well!"}/>
                    <button className="editCardButton">Done</button>
                </div>
            </div>
        </div>
    )
}