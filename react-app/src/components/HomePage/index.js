import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { login } from "../../store/session";

import NavBar from "../NavBar";

const HomePage = () => {
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const questions = useSelector((state) => state.questions)
    const dispatch = useDispatch();


    if (user) return <Redirect to="/" />;

    return (
        <div>
            <NavBar />
            <h1>hello</h1>
            {/* {errors && errors.map((error) => <div>{error}</div>)} */}
            {/* <main>
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
                </div>
            </main> */}
        </div>
    );
};

export default HomePage;