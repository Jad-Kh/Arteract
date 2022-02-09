import { useState, useRef, createRef } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import "./EditCard.css"

export default function EditCard({user, setUsername, visibility}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ coverFile, setCoverFile ] = useState();
    const [ profileFile, setProfileFile ] = useState();
    const [ name, setName ] = useState("");
    const [ desc, setDesc ] = useState("");
    const inputNameRef = createRef();
    const inputDescRef = createRef();
    let visibilityClass = visibility ? "editCard" : "editCardHidden";

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const handleSubmit = async(e) => {
        let newName;
        if(inputNameRef.current.value === "") {
            newName = user?.username;
        } else {
            newName = inputNameRef.current.value;
        }
        const newProfile = {
            userId: user?._id,
            username: newName,
            //description: inputDescRef.current.value
        }
        if(coverFile) {
            const coverData = new FormData();
            const coverFilename = (Date.now() + coverFile.name).slice(0,9) + (Date.now() + coverFile.name).slice(-4); // Date added to prevent conflict If 2 users uploaded a picture with same name
            coverData.append("file", coverFile);
            coverData.append("name", coverFilename);
            newProfile.coverPicture = coverFilename;
            try {
                await axios.post("/uploadbackground", coverData);
            } catch(error) {
                console.log(error);
            }
        }
        if(profileFile) {
            const profileData = new FormData();
            const profileFilename = (Date.now() + profileFile.name).slice(0,9) + (Date.now() + profileFile.name).slice(-4); // Date added to prevent conflict If 2 users uploaded a picture with same name
            profileData.append("file", profileFile);
            profileData.append("name", profileFilename);
            newProfile.profilePicture = profileFilename;
            try {
                await axios.post("/uploadavatar", profileData);
            } catch(error) {
                console.log(error);
            }
        }
        try {
            await axios.put("/users/" + user?._id, newProfile);
            const newUser = user;
            newUser.username = newName;
            setUsername(newName);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={visibilityClass}>
            <form className="editCardContainer">
                <div className="editCardUpper">
                    <input type="file" id="coverfile" accept=".png,.jpeg,.jpg" style={{ display: "none" }}
                           onChange={ (e) => setCoverFile(e.target.files[0]) }/>
                    <input type="file" id="profilefile" accept=".png,.jpeg,.jpg" style={{ display: "none" }}
                           onChange={ (e) => setProfileFile(e.target.files[0]) }/>
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
                    <input className="editCardName" placeholder={user?.username} 
                           value={name} onChange={handleNameChange} ref={inputNameRef}/>
                    <textarea className="editCardDesc" placeholder={"Hello, hope you're doing well!"}
                              value={desc} onChange={handleDescChange} ref={inputDescRef}/>
                </div>
                <Link to={`/profile/${user?.username}`} style={{ textDecoration: "none" }}>
                    <button className="editCardButton" onClick={() => {handleSubmit()}}>Done</button>
                </Link>
            </form>
        </div>
    )
}