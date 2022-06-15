import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import NavBar from "../NavBar";
import CreatedAt from "../util/CreatedAt";
import UpdatedAt from "../util/UpdatedAt";

import * as questionsActions from "../../store/questions";

const QuestionsToAnswerPage = () => {
    const user = useSelector((state) => state.session.user);
    const questions = useSelector((state) => state.questions);
    const questionsList = Object.values(questions);
    const questionsToAnswer = questionsList.filter(
        (obj) => obj.owner_id !== user.id
    );
    const questionsOrdered = questionsToAnswer.sort((a, b) =>
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
                <span className="question-page-title">
                    <svg
                        className="svg-pic"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.004 18.5v-2.67A7.009 7.009 0 0 0 19 9.5a7 7 0 1 0-10.002 6.326V18.5h6.006ZM12 8l-2 3h4l-2 3m-2.235 6.5a2.99 2.99 0 0 0 2.235 1c.886 0 1.683-.385 2.232-.996"
                            className="icon_svg-stroke"
                            stroke="#666"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <h3>Questions for you</h3>
                </span>
                {questionsOrdered.map((obj) => (
                    <div key={"question" + obj.id}  className="home-question-item">
                        <p className="question-owner">Ask by: {obj.owner_name}</p>
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

export default QuestionsToAnswerPage;
