import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import bg from "../../assets/splash-bg.jpg";
import LoginForm from "../auth/LoginForm";
// import SignUpForm from "../auth/SignUpForm";
import Footer from "./footer";

const SplashPage = () => {
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);

    if (user) return <Redirect to="/home" />;

    return (
        <div className="splash" style={{ backgroundImage: `url("${bg}")` }}>
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
                            <Link to="/signup" exact="true">
                                <div>Sign up with email</div>
                            </Link>
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
