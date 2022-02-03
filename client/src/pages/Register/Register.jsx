import { useRef, useState } from "react"
import { useHistory } from "react-router"
import "./Register.css"
import axios from "axios";
import FormInput from "../../components/FormInput/FormInput";

export default function Register() {

    const [ input, setInput ] = useState({
        username: "",
        email: "",
        birthday: "",
        password: "",
        confirm: "",
    });

    const inputs = [
        { 
            id: 1, 
            name: "username", 
            type: "text", 
            placeholder: "Username", 
            errorMessage: "Username should be 3-20 characters without specials", 
            label: "Username", 
            pattern: "^[A-Za-z0-9 ]{3,20}$",
            required: true
        },
        { 
            id: 2, 
            name: "email", 
            type: "email", 
            placeholder: "Email", 
            errorMessage: "Email should be valid", 
            label: "Email", 
            required: true 
        },
        { 
            id: 3, 
            name: "birthday", 
            type: "date", 
            placeholder: "Birthday", 
            label: "Birthday" 
        },
        { 
            id: 4, 
            name: "password",  
            type: "password", 
            placeholder: "Password", 
            errorMessage: "Password should be 8-20 characters with 1 letter, 1 number, and 1 special", 
            label: "Password", 
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[ !@#$%^&*])[a-zA-Z0-9 !@#$%^&*]{8,20}$`,
            required: true 
        },
        { 
            id: 5, 
            name: "confirm", 
            type: "password", 
            placeholder: "Confirm Password", 
            errorMessage: "Confirmation must match password", 
            label: "Confirm Password", 
            required: true 
        }
    ];

    const history = useHistory();

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); // this will prevent page refresh
        if(input.password !== input.confirm) {
            console.log("invalid register");
        } else {
            const user = {
                username: input.username,
                age: input.birthday,
                email: input.email,
                password: input.password,
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login")
            } catch(error) {
                console.log(error);
            }   
        }     
    }

    return (
        <div className="register">
            <div className="registerContainer">
                <div className="registerLeft">
                    <h3 className="registerLogo">Arteract</h3>
                    <span className="registerSpan">
                        The perfect hybird between social medias and artist platforms, Join Arteract today
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <h1 className="registerTitle">Register</h1>
                        {inputs.map((i) => (
                            <FormInput key={i.id} {...i} value={inputs[i.name]} onChange={onChange}/>
                        ))}
                        <button className="registerButton">Register</button>
                        <span className="registerAlready">Already have an account? Log in</span>
                    </form>
                </div>
            </div>
        </div>
    )
}