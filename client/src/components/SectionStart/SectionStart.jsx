import { Circularprogress } from "@material-ui/core";
import { createRef, useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { AddCircle } from "@material-ui/icons"
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import "./SectionStart.css";

export default function SecionStart({user, visibility, setVisibility, portfolio, type}) {

    const inputRef = createRef();

    const handleClick = async(e) => {
        e.preventDefault()
        const newSection = {
            artistId: user?._id,
            title: inputRef.current.value, 
            type,
        }
        try {
            await axios.put("/portfolios/section/" + portfolio?._id, newSection);
            setVisibility(!visibility);
        } catch(error) {
            console.log(error);
        }
    }

    let visibilityClass = visibility ? "sectionStartBox" : "sectionStartBoxHidden";

    return (
        <div className="sectionStart">
            <div className="sectionStartContainer">
                <div className="sectionStartRight">
                    <form className={visibilityClass} onSubmit={handleClick}>
                        <input placeholder="" type="text" className="sectionSubjectInputText" ref={inputRef}/>
                        <button className="sectionStartButton" type="submit">Done</button>
                    </form>
                </div>
            </div>
        </div>
    )
}