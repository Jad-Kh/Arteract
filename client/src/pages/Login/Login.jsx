import { useRef } from 'react';
import "./Login.css"

export default function Login() {

    const email = useRef();
    const password = useRef();
    const handleClick = (e) => {
        e.preventDefault(); // this will prevent page refresh
        
    }

    return (
        <div className="login">
            <div className="loginContainer">
                <div className="loginLeft">
                    <h3 className="loginLogo">Arteract</h3>
                    <span className="loginSpan">
                        The perfect hybird between social medias and artist platforms, Join Arteract today
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSumbit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" required ref={email}/>
                        <input placeholder="Password" type="password" className="loginInput" required ref={password}/>
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">Create a new account</button> 
                    </form>
                </div>
            </div>
        </div>
    )
}