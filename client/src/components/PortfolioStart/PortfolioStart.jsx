import { Circularprogress } from "@material-ui/core";
import { createRef, useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { AddCircle } from "@material-ui/icons"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import "./PortfolioStart.css";

export default function PortfolioStart({user, visibility, setVisibility}) {

    const inputRef = createRef();
    const [ file, setFile ] = useState();
    const [ level, setLevel ] = useState("");
    const [ inputValue, setInputValue ] = useState('');
    const [ types, setTypes ] = useState([]);

    const levels = [
        'Beginner', 'Intermediate', 'Professional' 
      ];

    const typesOptions = [
        'Painting', 'Graphic Design', '3D Modelling', 'Illustration', 'Sculpture', 'Animation', 'Photography', 'Drawing'
      ];

    useEffect(() => {
        types.includes(inputValue)
        ? setTypes(types)
        : setTypes((prev) => [...prev, inputValue])
    }, [inputValue])

    const handleClick = async(e) => {
        e.preventDefault()
        const newPortfolio = {
            artistId: user?._id,
            subject: inputRef.current.value, 
            level,
            types,
        }
        if(file) {
            const data = new FormData();
            const filename = (Date.now() + file.name).slice(0,9) + (Date.now() + file.name).slice(-4); // Date added to prevent conflict If 2 users uploaded a picture with same name
            data.append("file", file);
            data.append("name", filename);
            newPortfolio.coverPicture = filename;
            try {
                await axios.post("/uploadbackground", data);
            } catch(error) {
                console.log(error);
            }
        }
        try {
            await axios.post("/portfolios", newPortfolio);
            setVisibility(!visibility);
        } catch(error) {
            console.log(error);
        }
    }

    let visibilityClass = visibility ? "portfolioStartBox" : "portfolioStartBoxHidden";

    return (
        <div className="portfolioStart">
            <div className="portfolioStartContainer">
                <div className="portfolioStartRight">
                    <form className={visibilityClass} onSubmit={handleClick}>
                        <Autocomplete
                            options={levels}
                            style={{ width: 300 }}
                            inputValue={level}
                            onInputChange={(event, newInputValue) => {
                                setLevel(newInputValue)
                            }}
                            renderInput={(params) =>
                            <TextField {...params} label="Choose your level" variant="outlined"/>}
                        />
                        <Autocomplete
                            options={typesOptions}
                            style={{ width: 300 }}
                            inputValue={inputValue} 
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue)
                            }}
                            renderInput={(params) =>
                            <TextField {...params} label="Choose your art type" variant="outlined" />}
                        />
                        <div>{inputValue ? `Added: ${inputValue}` : ""}</div>
                        <input type="file" accept=".png,.jpeg,.jpg"
                                   onChange={ (e) => setFile(e.target.files[0]) }/>
                        <div className="portfolioChosenContainer">
                            {
                                types.map((type) => {
                                    <div className="portfolioChosenType">
                                        <span className="portfolioChosenTypeText">{type}</span>
                                        <div className="portfolioChosenTypeRemove"><AddCircle/></div>
                                    </div>
                                })
                            }
                        </div>
                        <input placeholder="" type="text" className="portfolioSubjectInputText" ref={inputRef}/>
                        <button className="portfolioStartButton" type="submit">Done</button>
                    </form>
                </div>
            </div>
        </div>
    )
}