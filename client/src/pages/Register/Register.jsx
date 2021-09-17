import "./Register.css"

export default function Register() {
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
                    <div className="registerBox">
                        <input placeholder="Username" className="registerInput"/>
                        <input placeholder="Email" className="registerInput"/>
                        <input placeholder="Password" type="password" className="registerInput"/>
                        <input placeholder="Confirm Password" type="password" className="registerInput"/>
                        <button className="registerButton">Sign Up</button>
                        <span className="registerAlready">Already have an account? Log in</span>
                    </div>
                </div>
            </div>
        </div>
    )
}