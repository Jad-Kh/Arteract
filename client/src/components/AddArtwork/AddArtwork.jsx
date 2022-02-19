import { createRef, useState, useEffect } from 'react';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./AddArtwork.css";

export default function AddArtwork({user, visibility, setVisibility, portfolio, setPortfolio}) {

    const titleInputRef = createRef();
    const descInputRef = createRef();
    const [ file, setFile ] = useState();
    const [ newlyCreatedArtwork, setNewlyCreatedArtwork ] = useState();
    const [ options, setOptions ] = useState([]);
    const [ inputValue, setInputValue ] = useState();
    const [ sections, setSections ] = useState([]);
    const [ sectionIds, setSectionIds ] = useState([])

    useEffect(() => {
        portfolio?.sections.map((section) => 
            setOptions((prev) => [...prev, section.title])
        )
    }, [])

    useEffect(() => {
        sections.includes(inputValue)
        ? setSections(sections)
        : setSections((prev) => [...prev, inputValue])
    }, [inputValue])

    useEffect(() => {
        sections.includes(inputValue)
        ? setSectionIds(sectionIds)
        : portfolio?.sections.map((section) => 
            section?.title === inputValue
            ? setSectionIds((prev) => [...prev, section._id])
            : setSectionIds(sectionIds)
          )  
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
            const response = await axios.post("/artworks/", newArtwork);
            setNewlyCreatedArtwork(response.data);
            sectionIds.map( async(sectionId) =>
                await axios.put("/sections/" + sectionId + "/add/", newlyCreatedArtwork)
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