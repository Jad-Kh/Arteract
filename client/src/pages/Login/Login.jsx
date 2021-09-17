import "./Login.css"

export default function Login() {
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
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput"/>
                        <input placeholder="Password" type="password" className="loginInput"/>
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">Create a new account</button> 
                    </div>
                </div>
            </div>
        </div>
    )
}