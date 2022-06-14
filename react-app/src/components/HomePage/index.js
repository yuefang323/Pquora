import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";

import NavBar from "../NavBar";
import CreatedAt from "../util/CreatedAt";
import UpdatedAt from "../util/UpdatedAt";
import AskModal from "./AskModal";

import * as questionsActions from "../../store/questions";

const HomePage = () => {
    // const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const questions = useSelector((state) => state.questions);
    const questionsList = Object.values(questions);
    const questionsOrdered = questionsList.sort((a, b) =>
        b.updated_at.localeCompare(a.updated_at)
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(questionsActions.getAllQuestions());
    }, [dispatch]);

    if (!user) return <Redirect to="/" />;

    return (
        <div className="home-page-wrapper">
            <NavBar />
            <div className="questions-list-content">
                <div className="question-box">
                    <p>Hi, {user.username}</p>
                    <h2>What do you want to ask or share?</h2>
                    <div className="home-ask-answer-btns">
                        <div className="nav-ask-question">
                            <AskModal />
                        </div>
                        <div>
                            <Link
                                to="/questions"
                                exact={true}
                                className="ask-answer-link"
                                target="_blank"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        stroke-width="1.5"
                                        fill="none"
                                        fill-rule="evenodd"
                                    >
                                        <path
                                            d="M18.571 5.429h0a2 2 0 0 1 0 2.828l-9.9 9.9-4.24 1.416 1.412-4.245 9.9-9.9h0a2 2 0 0 1 2.828 0Z"
                                            class="icon_svg-stroke"
                                            stroke="#666"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></path>
                                        <path
                                            class="icon_svg-fill_as_stroke"
                                            fill="#666"
                                            d="m4.429 19.571 2.652-.884-1.768-1.768z"
                                        ></path>
                                        <path
                                            d="M14.5 19.5h5v-5m-10-10h-5v5"
                                            class="icon_svg-stroke"
                                            stroke="#666"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></path>
                                    </g>
                                </svg>
                                <div className="ask-answer-word">Answer</div>
                            </Link>
                        </div>
                    </div>
                </div>
                {questionsOrdered.map((obj) => (
                    <div
                        key={"question" + obj.id}
                        className="home-question-item"
                    >
                        <NavLink
                            to={`/questions/${obj.id}`}
                            exact={true}
                            className="question-detail"
                        >
                            <div>
                                <p className="question-detail">{obj.content}</p>
                            </div>
                        </NavLink>
                        <div className="time">
                            <div className="create-at-time">
                                Created at:{" "}
                                <CreatedAt created_at={obj.created_at} />
                            </div>
                            <div className="update-at-time">
                                Updated at:{" "}
                                <UpdatedAt updated_at={obj.updated_at} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
