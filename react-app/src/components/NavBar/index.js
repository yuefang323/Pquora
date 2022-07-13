import React from "react";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import ReactTooltip from "react-tooltip";
import AddQuestionModal from "../QuestionPage/AddQuestionModel";
import { useSearch } from "../../context/Query";

const NavBar = () => {
    // Search bar
    const { search, setSearch } = useSearch();

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
                        data-tip="Questions to Answer"
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
            <div className="nav-center-side">
                <div className="search-wrapper">
                    <svg
                        className="search-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm10.45 2.95L16 16l4.95 4.95Z"
                            className="icon_svg-stroke"
                            stroke="#666"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <input
                        placeholder="Search pQuora"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-bar"
                    />
                </div>
            </div>
            <div className="nav-right-side">
                <div className="profile">
                    <Link
                        to="/profile"
                        exact="true"
                        activeclassname="profile-btn"
                        data-tip="User profile"
                    >
                        <i className="fa-solid fa-user fa-xl"></i>
                    </Link>
                </div>
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
