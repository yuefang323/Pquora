import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import ReactTooltip from "react-tooltip";
import AddQuestionModal from "../QuestionPage/AddQuestionModel";
import { useSearch } from "../../context/Query"

const NavBar = () => {
    // Search bar
   const { search, setSearch } = useSearch()

    return (
        <nav className="nav-wrapper">
            <div className="nav-left-side">
                <h2 className="logo-name-text">pQuora</h2>
                <div className="nav-center">
                    <NavLink
                        to="/"
                        exact={true}
                        activeClassName="active-home-answer-btn"
                        data-tip="Home"
                    >
                        <i className="fa-solid fa-house fa-xl"></i>
                    </NavLink>
                    <NavLink
                        to="/questions"
                        exact={true}
                        activeClassName="active-home-answer-btn"
                        data-tip="Answers"
                    >
                        <i className="fa-regular fa-pen-to-square fa-xl"></i>
                    </NavLink>
                    <Link
                        to="/about"
                        exact="true"
                        activeclassname="active-home-answer-btn"
                        data-tip="About"
                    >
                        <div>About</div>
                    </Link>
                </div>
            </div>
            <div className="search-bar">
                <input
                    placeholder="Enter your question"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
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
