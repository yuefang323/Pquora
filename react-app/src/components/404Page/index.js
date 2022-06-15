import { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";

import NavBar from "../NavBar";

// import "./index.css";

// import logo from "../../assets/esena.png";

const NotFound = () => {
    const history = useHistory();

    //   useEffect(() => {
    //     const timer = setTimeout(() => {
    //       history.push("/");
    //     }, 3000);
    //     return () => clearTimeout(timer);
    //   }, []);

    //   useEffect(() => {
    //     if (!timeLeft) return;
    //     const intervalId = setInterval(() => {
    //       setTimeLeft(timeLeft - 1);
    //     }, 1000);
    //     return () => clearInterval(intervalId);
    //   }, [timeLeft]);

    const handleOnClick = () => {
        history.push("/");
    };

    return (
        <>
            <NavBar />
            <div className="not-found-container">
                {/* <img src={logo} className="logo-404" alt="page-not-found" onClick={handleOnClick}/> */}
                <div className="not-found-msg title">Page Not Found</div>
                <div className="not-found-msg">
                    We searched everywhere but couldn't find the page you were
                    looking for.
                </div>
                <div className="redirect-links">
                    <Link
                        to={handleOnClick}
                        exact="true"
                        className="redirect-links"
                    >
                        Go Back
                    </Link>
                    <Link to="/" exact="true" className="redirect-links">
                        pQuora Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;
