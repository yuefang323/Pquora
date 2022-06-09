import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";

import bg from "../../assets/splash-bg.jpg";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";

const SplashPage = () => {
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault();
        return dispatch(login("demo@aa.io", "password")).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    };

    if (user) return <Redirect to="/main" />;

    return (
        <div className="splash" style={{ backgroundImage: `url("${bg}")` }}>
            <nav className="splash-nav-bar">
                {/* <NavLink to="/" className="logo">
					<img src={logo} alt="pQuora" />
				</NavLink> */}
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
            </nav>
            {errors && errors.map((error) => <div>{error}</div>)}
            <main>
                <div className="splash-wrapper">
                    <div className="splash-title-wrap">
                        <div className="splash-title">
                            <h1 className="app-title">pQuora</h1>
                            <h2 className="app-description">
                                A place to share knowledge and better understand
                                of infants
                            </h2>
                        </div>
                        <div className="main-session-forms">
                            <div className="signup-form">
                            <SignUpForm />
                            </div>
                            <div className="login-form">
                            <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default SplashPage;
