import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

import NavBar from "../NavBar";

function User() {
    const user = useSelector((state) => state.session.user);
    const userId = user.id;
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/users/${userId}`);
            const responseData = await response.json();
            setQuestions(responseData.questions);
            setAnswers(responseData.answers);
        }
        fetchData();
    }, [userId]);
    console.log(questions, "......")
    console.log(answers, "xxxxxxxxxx")

    if (!user) return <Redirect to="/" />;

    return (
        <div className="home-page-wrapper">
            <NavBar />
            <div className="questions-list-content">
                <div className="question-box">
                    <p>Hi, {user.username}! You have</p>
                    <h2 className="box-word">
                        {questions.length} questions | {answers.length} answers
                    </h2>
                </div>
                <ul>
                    <li>
                        <strong>User Id</strong> {userId}
                    </li>
                    <li>
                        <strong>Username</strong> {user.username}
                    </li>
                    <li>
                        <strong>Email</strong> {user.email}
                    </li>
                </ul>
                {questions.map((obj) => (
                    <div>
                        <NavLink
                            to={`/questions/${obj.id}`}
                            exact={true}
                            className="question-detail"
                        >
                            <div className="question-detail">
                                <p className="question-detail">{obj.content}</p>
                            </div>
                        </NavLink>

                    </div>
                ))}
            </div>
        </div>
    );
}
export default User;
