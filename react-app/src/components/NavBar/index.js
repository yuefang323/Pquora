import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import ReactTooltip from "react-tooltip";
import AddQuestionModal from "./AddQuestionModel";

const NavBar = () => {
    return (
        <nav className="nav-wrapper">
            <div className="nav-left-side">
                <h2>pQuora</h2>
                <div className="nav-center">
                    <NavLink
                        to="/"
                        exact={true}
                        activeClassName="active"
                        data-tip="Home"
                    >
                        <i className="fa-solid fa-house"></i>
                    </NavLink>
                    <NavLink
                        to="/answers"
                        exact={true}
                        activeClassName="active"
                        data-tip="Answers"
                    >
                        <i className="fa-regular fa-pen-to-square"></i>
                    </NavLink>
                </div>
            </div>
            <div className="nav-right-side">
                <div className="nav-ask-question">
                    <AddQuestionModal />
                </div>
                <div className="nav-logout">
                    <LogoutButton />
                </div>
            </div>
            <ReactTooltip place="bottom" type="dark" effect="solid" />
        </nav>
    );
};

export default NavBar;
