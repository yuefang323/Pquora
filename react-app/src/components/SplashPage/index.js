import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import bg from "../../assets/splash-bg.jpg";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import Footer from "./footer";

const SplashPage = () => {
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);

    if (user) return <Redirect to="/home" />;

    return (
        <div className="splash" style={{ backgroundImage: `url("${bg}")` }}>
            {/* <nav className="splash-nav-bar">
                <NavLink to="/" className="logo">
					<img src={logo} alt="pQuora" />
				</NavLink>
                <div className="splash-session-links">
                    <NavLink className="btn" exact to="/about">
                        About Us
                    </NavLink>
                    <button className="btn btn-yellow" onClick={demoLogin}>
                        Demo Login
                    </button>
                    <NavLink className="btn btn-yellow" exact to="/login">
                        Login
                    </NavLink>
                    <NavLink className="btn btn-yellow" exact to="/sign-up">
                        Sign Up
                    </NavLink>
                </div>
            </nav> */}
            {errors && errors.map((error) => <div>{error}</div>)}
            <main>
                <div className="splash-wrapper">
                    <div className="splash-title-wrapper">
                        <h3 className="app-title">pQuora</h3>
                        <p className="app-description">
                            A place to share knowledge and better understand of
                            infants
                        </p>
                    </div>
                    <div className="main-session-forms">
                        <div className="signup-form">
                            <SignUpForm />
                        </div>
                        <div className="login-form">
                            <LoginForm />
                        </div>
                    </div>
                    <Footer />
                </div>
            </main>
        </div>
    );
};

export default SplashPage;
