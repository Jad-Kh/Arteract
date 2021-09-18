import { useRef } from "react"
import { useHistory } from "react-router"
import "./Register.css"
import axios from "axios";

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const repeat = useRef();
    const history = useHistory();

    const handleClick = async(e) => {
        e.preventDefault(); // this will prevent page refresh
        if(repeat.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords don't match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
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
                    <form className="registerBox" onSubmit={handleClick}>
                        <input placeholder="Username" className="registerInput" required ref={username}/>
                        <input placeholder="Email" type="email" className="registerInput" required ref={email}/>
                        <input placeholder="Password" type="password" className="registerInput" required ref={password}/>
                        <input placeholder="Confirm Password" type="password" className="registerInput" required ref={repeat}/>
                        <button className="registerButton" type="submit">Sign Up</button>
                        <span className="registerAlready">Already have an account? Log in</span>
                    </form>
                </div>
            </div>
        </div>
    )
}