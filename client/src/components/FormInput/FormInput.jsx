import { useState } from "react";
import "./FormInput.css";

export default function FormInput(props) {

    const [ focused, setFocused ] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    }

    return (
        <div className="formInput">
            <label className="formInputLabel">{label}</label>
            <input className="formInputField" 
                {...inputProps} 
                onChange={onChange} 
                onBlur={handleFocus} 
                onFocus={() => inputProps.name === "confirm" && setFocused(true)}
                focused={focused.toString()}
            />
            <span className="formInputErrorMessage">{errorMessage}</span>
        </div>
    )
}