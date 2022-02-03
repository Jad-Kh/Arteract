import { useRef, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../api";
import "./Login.css"
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom"

export default function Login() {

    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault(); // this will prevent page refresh
        login({ email: email.current.value, password: password.current.value }, dispatch);
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
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" required ref={email}/>
                        <input placeholder="Password" type="password" className="loginInput" required ref={password}/>
                        <button className="loginButton" type="submit">
                            {isFetching ? <CircularProgress color="white" size="25px"/> : "Log In"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to={"/register"} style={{ textDecoration: "none" }}>
                            <button className="loginRegisterButton">Create a new account</button> 
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}