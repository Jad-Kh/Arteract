import { createRef, useState, useEffect } from 'react';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./AddArtwork.css";

export default function AddArtwork({user, visibility, setVisibility, section}) {

    const titleInputRef = createRef();
    const descInputRef = createRef();
    const [ file, setFile ] = useState();

    const handleClick = async(e) => {
        e.preventDefault()
        const newArtwork = {
            artistId: user?._id,
            title: titleInputRef.current.value, 
            description: descInputRef.current.value,
            status: "none",
            price: 0,
            section,
        }
        if(file) {
            const data = new FormData();
            const filename = (Date.now() + file.name).slice(0,9) + (Date.now() + file.name).slice(-4); // Date added to prevent conflict If 2 users uploaded a picture with same name
            data.append("file", file);
            data.append("name", filename);
            newArtwork.picture = filename;
            try {
                await axios.post("/uploadartwork", data);
            } catch(error) {
                console.log(error);
            }
        }
        try {
            const newResponse = await axios.post("/artworks/", newArtwork);
            await axios.put("/sections/" + section._id + "/add/", { artId: newResponse.data._id })
            setVisibility(!visibility);
        } catch(error) {
            console.log(error);
        }
    }

    let visibilityClass = visibility ? "addArtworkStartBox" : "addArtworkStartBoxHidden";

    return (
        <div className="addArtworkStart">
            <div className="addArtworkStartContainer">
                <div className="addArtworkStartRight">
                    <form className={visibilityClass} onSubmit={handleClick}>
                        <input placeholder="Title" type="text" className="addArtworkSubjectInputText" ref={titleInputRef}/>
                        <input placeholder="Description" type="text" className="addArtworkSubjectInputText" ref={descInputRef}/>
                        <input type="file" accept=".png,.jpeg,.jpg"
                                   onChange={ (e) => setFile(e.target.files[0]) }/>
                        <button className="addArtworkStartButton" type="submit">Done</button>
                    </form>
                </div>
            </div>
        </div>
    )
}