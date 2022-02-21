import { createRef, useState, useEffect } from 'react';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./AddArtwork.css";

export default function AddArtwork({user, visibility, setVisibility, portfolio, setPortfolio, options}) {

    const titleInputRef = createRef();
    const descInputRef = createRef();
    const [ file, setFile ] = useState();
    const [ inputValue, setInputValue ] = useState();
    const [ sections, setSections ] = useState([]);

    useEffect(() => {
        sections.includes(inputValue)
        ? setSections(sections)
        : setSections((prev) => [...prev, inputValue])
    }, [inputValue])

    const handleClick = async(e) => {
        e.preventDefault()
        const newArtwork = {
            artistId: user?._id,
            title: titleInputRef.current.value, 
            description: descInputRef.current.value,
            status: "none",
            price: 0,
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
            var currentSection;
            sections?.map( async(section) =>
                currentSection = await axios.get("/sections/" + user._id + "/" + section),
                await axios.put("/sections/" + currentSection.data._id + "/add/", { artId: newResponse.data._id })
            )
            setVisibility(!visibility);
            setPortfolio(portfolio);
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
                        <Autocomplete
                            options={options}
                            style={{ width: 300 }}
                            inputValue={inputValue} 
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue)
                            }}
                            renderInput={(params) =>
                            <TextField {...params} label="Choose your art type" variant="outlined" />}
                        />
                        <button className="addArtworkStartButton" type="submit">Done</button>
                    </form>
                </div>
            </div>
        </div>
    )
}